import '@vonage/vvd-core';
import '@vonage/vwc-switch';
import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { SchemeOption } from '@vonage/vvd-scheme/vvd-scheme.js';
import { SCHEME_SELECT_EVENT_TYPE } from '@vonage/vvd-scheme/scheme-change-listener.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-scheme-switch': VWCSchemeSwitch;
	}
}

@customElement('vwc-scheme-switch')
export class VWCSchemeSwitch extends LitElement {
	schemes: SchemeOption[] = ['light', 'dark'];
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
			@change=${(e: InputEvent) =>
				this.handleChange(
					(e.target as HTMLInputElement).checked ? 'dark' : 'light'
				)}
		></vwc-switch>`;
	}
}
