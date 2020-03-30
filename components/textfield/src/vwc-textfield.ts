import { customElement } from 'lit-element';
import { TextFieldBase as MwcTextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
import { style } from '@material/mwc-textfield/mwc-textfield-css';

export { TextFieldType as MwcTextFieldType } from '@material/mwc-textfield/mwc-textfield-base';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': TextField;
  }
}

@customElement('vwc-textfield')
export class TextField extends MwcTextFieldBase {
  static get styles() {
    return [style];
  }
}
