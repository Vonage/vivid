import '@vonage/vvd-core';
import {
	customElement,
	html,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-theme-alternate.css';

export const COMPONENT_NAME = 'vwc-theme-alternate';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCThemeAlternate;
	}
}

/**
 * `vwc-theme-alternate` component is designated to wrap html scope in an ui-contrasting region
 */
@customElement('vwc-theme-alternate')
export class VWCThemeAlternate extends LitElement {
	static styles = [style];

	protected render(): TemplateResult {
		return html`<div class="container" part="vvd-scheme-alternate">
				<slot></slot>
			</div>
			`;
	}
}
