import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement, html } from 'lit-element';
import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { style } from '@material/mwc-button/mwc-button-css';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': VwcButton;
  }
}

@customElement('vwc-button')
export class VwcButton extends ButtonBase {
  static styles = style;

  protected renderIcon() {
    return html`<vwc-icon class="mdc-button__icon">${this.icon}</vwc-icon>`;
  }
}
