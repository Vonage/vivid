import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement,
	property,
	html,
	TemplateResult,
	LitElement,
} from 'lit-element';
import { style as vwcHelperMessageStyle } from './vwc-helper-message.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-helper-message': VWCHelperMessage;
	}
}

/**
 * internal component to be used as a helper message part in textfield / textarea / select / file-picker etc
 *
 * @module vwc-helper-message
 *
 * @property {string} message - the message to be shown
 * @property {boolean} [isError=false] - is the component showing the error state (will show the error icon); reflected attribute is `is-error`
 */
@customElement('vwc-helper-message')
export class VWCHelperMessage extends LitElement {
	static styles = [vwcHelperMessageStyle];

	@property({ attribute: 'is-error', type: Boolean, reflect: true })
	isError = false;

	protected render(): TemplateResult {
		return html`
			<vwc-icon class="helper-icon" type="info-negative" size="small"></vwc-icon>
			<span class="helper-text"><slot></slot></span>
		`;
	}
}
