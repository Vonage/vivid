import '@vonage/vvd-core';
import '@vonage/vwc-switch';
import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { style } from './vwc-theme-switch.css.js';
import {
	default as vvdScheme,
	SchemeOption,
} from '@vonage/vvd-scheme/vvd-scheme.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-theme-switch': VWCThemeSwitch;
	}
}

/* eslint-disable no-shadow */
enum switchScheme {
	checked = 'dark',
	unchecked = 'light',
}

@customElement('vwc-theme-switch')
export class VWCThemeSwitch extends LitElement {
	static styles = style;

	private handleChange(e: InputEvent): void {
		const scheme: SchemeOption = (e.target as HTMLInputElement).checked
			? switchScheme.checked
			: switchScheme.unchecked;

		vvdScheme.set(scheme);
	}

	render(): TemplateResult {
		return html` <vwc-switch
			connotation="primary"
			?checked=${vvdScheme.getSelectedScheme() === switchScheme.checked}
			@change=${this.handleChange}
		></vwc-switch>`;
	}
}
