import { customElement, html, LitElement } from 'lit-element';
import { SchemeOption } from '@vonage/vvd-scheme/src/vvd-scheme';

export const SCHEME_SELECTION = 'vvd-scheme-selection';

const createSelectionCustomEvent = (schemeType: SchemeOption) =>
  new CustomEvent(SCHEME_SELECTION, {
    detail: { schemeType },
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

  render() {
    return html`
      ${this.schemes.map(
        scheme =>
          html`
            <button
              @click="${document.dispatchEvent.bind(this, createSelectionCustomEvent(scheme))}"
            >
              ${scheme}
            </button>
          `,
      )}
    `;
  }
}
