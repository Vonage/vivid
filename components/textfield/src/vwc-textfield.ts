import { TextField as MwcTextField } from '@material/mwc-textfield';
import { customElement } from 'lit-element';

@customElement('vwc-textfield')
// @ts-ignore: Unreachable code error
export class TextField extends MwcTextField {
  static get styles() {
    return [super.styles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': TextField;
  }
}
