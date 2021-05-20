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

@customElement('vwc-expansion-panel')
export class VWCExpansionPanel extends VWCExpansionPanelBase {
	static styles = style;

	@property({ type: String, reflect: true })
	header = '';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	chevronToggle = false;

	@property({ type: Boolean, reflect: true })
	trailingToggle = false;

	@property({ type: Boolean, reflect: true })
	noRipple = false;

	@queryAsync('mwc-ripple') ripple!: Promise<Ripple>;

	protected rippleHandlers = new RippleHandlers(() => {
		return this.ripple;
	});

	protected firstUpdated(): void {
		const header = this.shadowRoot?.querySelector('.expansion-panel-header');
		header?.addEventListener('click', this.toggleOpen.bind(this));
		header?.addEventListener('touchstart', this.toggleOpen.bind(this));
	}

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
		return html`<div class="expansion-panel">
			<div class="expansion-panel-header"
				@mousedown="${this.handleRippleActivate}"
				@mouseenter="${this.handleRippleMouseEnter}"
				@mouseleave="${this.handleRippleMouseLeave}"
				@touchstart="${this.handleRippleActivate}"
				@touchend="${this.handleRippleDeactivate}"
				@touchcancel="${this.handleRippleDeactivate}"
			>
				${this.renderRipple()}
				<span class="leading-icon">
					<slot name="icon">
						${this.icon || !this.trailingToggle ? this.renderIconOrToggle() : ''}
					</slot>
				</span>
				${this.header}
				<span class="trailing-icon">
					<slot name="trailingIcon">
						${this.trailingToggle ? this.renderToggle() : ''}
					</slot>
				</span>
			</div>
			<div class="expansion-panel-body">
				<slot></slot>
			</div>
		</div>`;
	}

	protected renderIconOrToggle(): TemplateResult {
		if (this.icon) {
			return html`<vwc-icon type="${this.icon}"></vwc-icon>`;
		} else {
			return this.renderToggle();
		}
	}

	protected renderToggle(): TemplateResult {
		return html`
			<vwc-icon
				class="toggle-open"
				type="${this.chevronToggle ? 'chevron-down-solid' : 'plus-solid'}"
			>
			</vwc-icon>
			<vwc-icon
				class="toggle-close"
				type="${this.chevronToggle ? 'chevron-up-solid' : 'minus-solid'}"
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
