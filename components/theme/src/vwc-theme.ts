import '@vonage/vvd-core';
import {
	customElement,
	html,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-theme.css';

export const COMPONENT_NAME = 'vwc-theme';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCTheme;
	}
}

/**
 * `vwc-theme` component is designated to wrap html scope in an ui-contrasting region
 */
@customElement('vwc-theme')
export class VWCTheme extends LitElement {
	static styles = [style];

	protected render(): TemplateResult {
		return html`
		<div class="container">
				<slot></slot>
			</div>
			`;
	}
}
