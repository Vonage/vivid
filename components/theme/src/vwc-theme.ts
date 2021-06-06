import '@vonage/vvd-core';
import {
	customElement,
	html,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-theme.css';
import { Scheme } from './vwc-theme-types';
import { getPreferedColorScheme } from './vwc-theme-utils';

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

	@property({	type: String,	reflect: false })
	protected scheme?: Scheme = getPreferedColorScheme();

	protected render(): TemplateResult {
		return html`
		<div class="container">
				<slot></slot>
			</div>
			`;
	}
}
