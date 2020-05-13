import { customElement, html, LitElement } from 'lit-element';
import { SchemeOption } from '@vonage/vvd-scheme/src/vvd-scheme';

export const SCHEME_SELECT = 'vvd-scheme-select';

const createSelectionCustomEvent = (scheme: SchemeOption) =>
  new CustomEvent(SCHEME_SELECT, {
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

  render() {
    return html`
      ${this.schemes.map(
        scheme =>
          html`
            <button @click="${this.dispatchEvent.bind(this, createSelectionCustomEvent(scheme))}">
              ${scheme}
            </button>
          `,
      )}
    `;
  }
}
