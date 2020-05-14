import '@vonage/vvd-core';
import { style } from '@material/mwc-icon/mwc-icon-host-css';
import { customElement, html, LitElement } from 'lit-element';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-icon': VwcIcon;
  }
}

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
@customElement('mwc-icon')
export class MwcIcon extends LitElement {
  static styles = style;

  protected render() {
    return html`<slot></slot>`;
  }
}

@customElement('vwc-icon')
export class VwcIcon extends MwcIcon { }
