import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { SchemeOption } from '@vonage/vvd-scheme/vvd-scheme.js';
import { SCHEME_SELECT_EVENT_TYPE } from '@vonage/vvd-scheme/scheme-change-listener.js';

const createSelectionCustomEvent = (scheme: SchemeOption) =>
	new CustomEvent(SCHEME_SELECT_EVENT_TYPE, {
		detail: { scheme },
		bubbles: true, // needed for bubbling up the shadow DOM
		composed: true, // needed for bubbling up the shadow DOM
	});

declare global {
	interface HTMLElementTagNameMap {
		'vwc-scheme-select': SchemeSelect;
	}
}

@customElement('vwc-scheme-select')
export class SchemeSelect extends LitElement {
	schemes: SchemeOption[] = ['syncWithOSSettings', 'light', 'dark'];

	render(): TemplateResult {
		return html`
      ${this.schemes.map(
			scheme =>
				html`
            <vwc-button unelevated @click="${this.dispatchEvent.bind(this, createSelectionCustomEvent(scheme))}">
              ${scheme}
            </vwc-button>
          `,
		)}
    `;
	}
}
