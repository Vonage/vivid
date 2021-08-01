import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement,
	eventOptions,
	html,
	property,
	queryAsync,
	TemplateResult
} from 'lit-element';
import '@material/mwc-ripple/mwc-ripple';
import { Ripple } from '@material/mwc-ripple/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';
import { VWCExpansionPanelBase } from './vwc-expansion-panel-base.js';
import { style } from './vwc-expansion-panel.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-expansion-panel': VWCExpansionPanel;
	}
}

const iconSets = ['chevron', 'binary'];
export type IndicatorIconSets = typeof iconSets;

@customElement('vwc-expansion-panel')
export class VWCExpansionPanel extends VWCExpansionPanelBase {
	static styles = style;

	/**
	 * @deprecated use {@link VWCExpansionPanel.heading} instead
	 */
	@property({ type: String, reflect: true })
	header = '';

	/**
	 * The heading of the expanded panel
	 */
	@property({ type: String, reflect: true })
	heading = '';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true })
	indicatorIconSet: IndicatorIconSets[number] = 'chevron';

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	leadingToggle = false;

	@property({ type: Boolean, reflect: true })
	noRipple = false;

	@queryAsync('mwc-ripple') ripple!: Promise<Ripple>;

	protected rippleHandlers = new RippleHandlers(() => {
		return this.ripple;
	});

	protected toggleOpen(): void {
		this.open = !this.open;
	}

	openChanged(isOpen: boolean): void {
		super.openChanged(isOpen);
		this.toggleAttribute('open', isOpen);
	}

	protected renderRipple(): TemplateResult|string {
		return !this.noRipple ? html`<mwc-ripple></mwc-ripple>` : '';
	}

	protected render(): TemplateResult {
		return html`
			<button class="expansion-panel-header"
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
				.aria-expanded=${this.open}
				aria-controls="content"
			>
				${this.renderRipple()}
				<span class="leading-icon">
					<slot name="icon">
						${this.renderIconOrToggle()}
					</slot>
				</span>
				${this.heading || this.header}
				<span class="trailing-icon">
					<slot name="trailingIcon">
						${!this.leadingToggle ? this.renderToggle() : ''}
					</slot>
				</span>
			</button>
			<div id="content" class="expansion-panel-body">
				<slot></slot>
			</div>`;
	}

	protected renderIconOrToggle(): TemplateResult | string {
		if (this.leadingToggle) {
			return this.renderToggle();
		} else if (this.icon) {
			return html`<vwc-icon type="${this.icon}" size="medium"></vwc-icon>`;
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

	@eventOptions({ passive: true })
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
