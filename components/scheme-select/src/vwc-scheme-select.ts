import { customElement, html, LitElement } from 'lit-element';
import { SchemeType } from '@vonage/vvd-scheme';

export const SCHEME_SELECTION = 'vvd-scheme-selection';

const createSelectionCustomEvent = (schemeType: SchemeType) =>
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
  selectLight = createSelectionCustomEvent('light');
  selectDark = createSelectionCustomEvent('dark');

  // staticMethod(scheme: SchemeType) {
  //   document.dispatchEvent(myEvent);
  // }

  render() {
    return html`
      <button @click="${document.dispatchEvent.bind(this, this.selectLight)}">
        Light
      </button>
      <button @click="${document.dispatchEvent.bind(this, this.selectDark)}">
        Dark
      </button>
    `;
  }
}
