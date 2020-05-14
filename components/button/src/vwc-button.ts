import '@vonage/vvd-core';
import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { style } from '@material/mwc-button/mwc-button-css.js';
import { customElement, html } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
@customElement('mwc-button')
export class Button extends ButtonBase {
  static styles = style;

  protected renderIcon() {
    return html`
      <vwc-icon class="mdc-button__icon">
        ${this.icon}
      </vwc-icon>
    `;
  }
}

@customElement('vwc-button')
export class VWCButton extends Button { }

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': VWCButton;
  }
}
