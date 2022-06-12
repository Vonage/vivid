import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@material/mwc-ripple/mwc-ripple.js';
import {
	customElement,
	eventOptions,
	html,
	property,
	queryAsync,
	TemplateResult
} from 'lit-element';
import type { Ripple } from '@material/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers.js';
import { VWCExpansionPanelBase } from './vwc-expansion-panel-base.js';
import { style } from './vwc-expansion-panel.css.js';
import {nothing} from 'lit-html';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-expansion-panel': VWCExpansionPanel;
	}
}

const iconSets = ['chevron', 'binary'];
export type IndicatorIconSets = typeof iconSets;

const VALID_HEADER_VALUES = [2, 3, 4, 5, 6];

function isValidHeaderValue(headerValue: string | number) {
	return VALID_HEADER_VALUES.includes(Number(headerValue));
}

@customElement('vwc-expansion-panel')
export class VWCExpansionPanel extends VWCExpansionPanelBase {
	static override styles = style;

	/**
	 * @deprecated use "heading" instead
	 */
	@property({type: String, reflect: true})
		header = '';

	/**
	 * The heading of the expanded panel
	 */
	@property({type: String, reflect: true})
		heading = '';

	@property({type: String, reflect: true})
		icon = '';

	@property({type: String, reflect: true})
		indicatorIconSet: IndicatorIconSets[number] = 'chevron';

	@property({ type: String, reflect: true })
		meta = '';

	@property({ type: Boolean, reflect: true })
		dense = false;

	@property({type: Boolean, reflect: true})
		leadingToggle = false;

	@property({type: Boolean, reflect: true})
		noRipple = false;
	@queryAsync('mwc-ripple') ripple!: Promise<Ripple>;
	protected rippleHandlers = new RippleHandlers(() => {
		return this.ripple;
	});
	@property({type: String, reflect: true, attribute: 'heading-level'})
	private headingLevel = '3';

	override openChanged(isOpen: boolean): void {
		super.openChanged(isOpen);
		this.toggleAttribute('open', isOpen);
	}

	protected toggleOpen(): void {
		this.open = !this.open;
	}

	protected renderRipple(): TemplateResult | string {
		return !this.noRipple ? html`
			<mwc-ripple></mwc-ripple>` : '';
	}

	private renderMeta(): TemplateResult | unknown {
		return this.meta ? html`<span class="meta">${this.meta}</span>` : nothing;
	}

	protected renderHeaderButton(): TemplateResult {

		return html`
			<button class="expansion-panel-button" id="expansion-panel"
				@mousedown="${this.handleRippleActivate}"
				@mouseenter="${this.handleRippleMouseEnter}"
				@mouseleave="${this.handleRippleMouseLeave}"
				@touchstart="${() => {
		this.toggleOpen();
		this.handleRippleActivate;
	}}"
							@touchend="${this.handleRippleDeactivate}"
							@touchcancel="${this.handleRippleDeactivate}"
							@click=${() => this.toggleOpen()}
							?aria-expanded=${this.open}
							aria-controls="content"
			>
				${this.renderRipple()}
				<span class="leading-icon">
					<slot name="icon">
						${this.renderIconOrToggle()}
					</slot>
				</span>
				<span class="heading-text">${this.heading || this.header}</span>
				${this.renderMeta()}
				<span class="trailing-icon">
					<slot name="trailingIcon">
						${!this.leadingToggle ? this.renderToggle() : ''}
					</slot>
				</span>
			</button>
		`;
	}

	protected renderPanelHeader(): TemplateResult | string {
		if (!isValidHeaderValue(this.headingLevel)) this.headingLevel = '3';
		switch (this.headingLevel) {
		case '2':
			return html`<h2 class="expansion-panel-header">${this.renderHeaderButton()}</h2>`;
		case '4':
			return html`<h4 class="expansion-panel-header">${this.renderHeaderButton()}</h4>`;
		case '5':
			return html`<h5 class="expansion-panel-header">${this.renderHeaderButton()}</h5>`;
		case '6':
			return html`<h6 class="expansion-panel-header">${this.renderHeaderButton()}</h6>`;
		default:
			return html`<h3 class="expansion-panel-header">${this.renderHeaderButton()}</h3>`;
		}
	}

	protected override render(): TemplateResult {
		return html`
			${this.renderPanelHeader()}
			<div id="content" class="expansion-panel-body">
				<slot></slot>
			</div>`;

	}

	protected renderIconOrToggle(): TemplateResult | string {
		if (this.leadingToggle) {
			return this.renderToggle();
		} else if (this.icon) {
			return html`
				<vwc-icon type="${this.icon}" size="medium"></vwc-icon>`;
		} else {
			return '';
		}
	}

	protected renderToggle(): TemplateResult {
		return html`
			<vwc-icon
				class="toggle-open"
				type="${this.indicatorIconSet === 'chevron' ? 'chevron-down-solid' : 'plus-solid'}"
			>
			</vwc-icon>
			<vwc-icon
				class="toggle-close"
				type="${this.indicatorIconSet === 'chevron' ? 'chevron-up-solid' : 'minus-solid'}"
			>
			</vwc-icon>
		`;
	}

	@eventOptions({passive: true})
	private handleRippleActivate(evt?: Event) {
		const onUp = () => {
			window.removeEventListener('mouseup', onUp);

			this.handleRippleDeactivate();
		};

		window.addEventListener('mouseup', onUp);
		this.rippleHandlers.startPress(evt);
	}

	private handleRippleDeactivate() {
		this.rippleHandlers.endPress();
	}

	private handleRippleMouseEnter() {
		this.rippleHandlers.startHover();
	}

	private handleRippleMouseLeave() {
		this.rippleHandlers.endHover();
	}
}
