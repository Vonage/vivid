import { customElement } from 'lit-element';

import { ButtonBase } from './vwc-button.base';
// import { style } from './vwc-button.css';

@customElement('vwc-button')
export class Button extends ButtonBase {
  // static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}
