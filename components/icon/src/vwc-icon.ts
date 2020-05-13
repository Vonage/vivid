import '@vonage/vvd-core';
import { style } from '@material/mwc-icon/mwc-icon-host-css';
import { customElement, html, LitElement } from 'lit-element';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-icon': VwcIcon;
  }
}

@customElement('vwc-icon')
export class VwcIcon extends LitElement {
  static styles = style;

  protected render() {
    return html`<slot></slot>`;
  }
}
