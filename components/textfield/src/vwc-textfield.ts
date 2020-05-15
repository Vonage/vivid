import '@vonage/vvd-core';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base.js';
import { customElement } from 'lit-element';

export { TextFieldType } from '@material/mwc-textfield/mwc-textfield-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': VwcTextField;
  }
}

@customElement('mwc-textfield')
class MwcTextField extends TextFieldBase {
  static styles = [mwcTextFieldStyle, vwcTextFieldStyle];
}

@customElement('vwc-textfield')
export class VwcTextField extends MwcTextField { }
