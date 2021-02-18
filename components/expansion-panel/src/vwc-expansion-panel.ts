import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement,
	html,
	property,
	TemplateResult
} from 'lit-element';
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
	chevronToggle = false;

	@property({ type: Boolean, reflect: true })
	trailingToggle = false;

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

	protected render(): TemplateResult {
		return html`<div class="expansion-panel">
			<div class="expansion-panel-header">
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
			return html`<vwc-icon class="vvd-icon" type="${this.icon}"></vwc-icon>`;
		} else {
			return this.renderToggle();
		}
	}

	protected renderToggle(): TemplateResult {
		return html`
			<vwc-icon
				class="vvd-icon toggle-open"
				type="${this.chevronToggle ? 'chevron-down-solid' : 'plus-solid'}"
			>
			</vwc-icon>
			<vwc-icon
				class="vvd-icon toggle-close"
				type="${this.chevronToggle ? 'chevron-up-solid' : 'minus-solid'}"
			>
			</vwc-icon>
		`;
	}
}
