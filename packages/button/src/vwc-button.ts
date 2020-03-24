import { customElement } from 'lit-element';

import { ButtonBase } from './vwc-button.base';
import { scheme } from '@vivid/scheme';
// import { style as customStyle } from './vwc-button.css';

@customElement('vwc-button')
// @ts-ignore: Unreachable code error
export class Button extends ButtonBase {
  static get styles() {
    return [super.styles, scheme];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}
