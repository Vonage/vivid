import { customElement } from 'lit-element';

import { ButtonBase } from './_vivid-button.base';
import { style } from './vivid-button.css';

@customElement('mwc-button')
export class Button extends ButtonBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'mwc-button': Button;
  }
}
