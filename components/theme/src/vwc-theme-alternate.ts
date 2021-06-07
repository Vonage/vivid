import { COMPONENT_NAME as themeComponentName, VWCTheme } from './vwc-theme';
import '@vonage/vvd-core';
import {
	customElement,
	html,
	internalProperty,
	LitElement,
	TemplateResult,
} from 'lit-element';

import { style } from './vwc-theme-alternate.css';
import { Scheme } from './vwc-theme-types';

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
	_themeEl?: VWCTheme | null;

	@internalProperty()
	protected scheme?: Scheme;

	connectedCallback(): void {
		super.connectedCallback();
		this._themeEl = this.closest(themeComponentName);
		this._themeEl?.addEventListener('change', this.pairScheme.bind(this));
		this.pairScheme();
	}

	private pairScheme() {
		this.scheme = this._themeEl?.scheme;
	}

	protected render(): TemplateResult {
		return html`<div class="container ${this.scheme || ''}">
				<slot></slot>
			</div>
			`;
	}
}
