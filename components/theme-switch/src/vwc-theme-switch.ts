import '@vonage/vvd-core';
import '@vonage/vwc-switch';
import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { style } from './vwc-theme-switch.css.js';
import {
	default as vvdScheme,
	SchemeOption,
} from '@vonage/vvd-scheme/vvd-scheme.js';
import { SCHEME_SELECT_EVENT_TYPE } from '@vonage/vvd-scheme/scheme-change-listener.js';

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
	handleChange: (scheme: SchemeOption) => void;

	constructor() {
		super();
		if (globalThis.BroadcastChannel) {
			const bc = new BroadcastChannel(SCHEME_SELECT_EVENT_TYPE);
			this.handleChange = (scheme) => bc.postMessage(scheme);
		} else {
			this.handleChange = (scheme: SchemeOption) =>
				this.dispatchEvent(
					new CustomEvent(SCHEME_SELECT_EVENT_TYPE, {
						detail: { scheme },
						bubbles: true, // needed for bubbling up the shadow DOM // ! throws in safari
						composed: true, // needed for bubbling up the shadow DOM
					})
				);
		}
	}

	render(): TemplateResult {
		return html` <vwc-switch
			connotation="cta"
			?checked=${vvdScheme.getSelectedScheme() === switchScheme.checked}
			@change=${(e: InputEvent) =>
				this.handleChange(
					(e.target as HTMLInputElement).checked
						? switchScheme.checked
						: switchScheme.unchecked
				)}
		></vwc-switch>`;
	}
}
