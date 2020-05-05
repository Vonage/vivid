import '@vonage/vvd-core';
import { TextField as MwcTextField } from '@material/mwc-textfield/mwc-textfield';
import { customElement } from 'lit-element';
import { style as customStyle } from './vwc-textfield-cutom.css';

export { TextFieldType as MwcTextFieldType } from '@material/mwc-textfield/mwc-textfield';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': TextField;
  }
}

@customElement('vwc-textfield')
// @ts-ignore
export class TextField extends MwcTextField {
  static get styles() {
    return [super.styles, customStyle];
  }
}
