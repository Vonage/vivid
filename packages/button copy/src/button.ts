import { customElement } from 'lit-element';

import { ButtonBase } from './vivid-button.base';
import { style } from './vivid-button.css';

@customElement('vivid-button')
export class Button extends ButtonBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'vivid-button': Button;
  }
}
