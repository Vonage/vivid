import { customElement, html, LitElement, TemplateResult } from 'lit-element';
import { SchemeOption } from '@vonage/vvd-scheme/vvd-scheme.js';
import { SCHEME_SELECT_EVENT_TYPE } from '@vonage/vvd-scheme/scheme-change-listener.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-scheme-select': SchemeSelect;
  }
}

@customElement('vwc-scheme-select')
export class SchemeSelect extends LitElement {
  schemes: SchemeOption[] = ['syncWithOSSettings', 'light', 'dark'];
  onClick: (scheme: SchemeOption) => void;

  constructor() {
    super();
    if (!globalThis.BroadcastChannel) {
      const bc = new BroadcastChannel(SCHEME_SELECT_EVENT_TYPE);
      this.onClick = (scheme) => bc.postMessage(scheme);
    } else {
      this.onClick = (scheme: SchemeOption) =>
        this.dispatchEvent(
          new CustomEvent(SCHEME_SELECT_EVENT_TYPE, {
            detail: { scheme },
            bubbles: true, // needed for bubbling up the shadow DOM // ! throws in safari
            composed: true, // needed for bubbling up the shadow DOM
          })
        );
      // this.dispatchEvent(
      //   new CustomEvent(SCHEME_SELECT_EVENT_TYPE, {
      //     detail: { scheme },
      //     bubbles: true, // needed for bubbling up the shadow DOM
      //     composed: true, // needed for bubbling up the shadow DOM
      //   })
      // );
    }
  }

  render(): TemplateResult {
    return html`
      ${this.schemes.map(
        (scheme) =>
          html`
            <vwc-button
              dense
              unelevated
              layout="filled"
              connotation="cta"
              @click="${this.onClick.bind(this, scheme)}"
            >
              ${scheme}
            </vwc-button>
          `
      )}
    `;
  }
}
