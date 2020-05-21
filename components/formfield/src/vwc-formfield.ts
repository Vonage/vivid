import '@vonage/vvd-core';
import { style as mwcFormfieldStyle } from '@material/mwc-formfield/mwc-formfield-css.js';
import { FormfieldBase } from '@material/mwc-formfield/mwc-formfield-base.js';
import { customElement } from 'lit-element';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-formfield': VwcFormfield;
  }
}

@customElement('mwc-formfield')
class MwcFormfield extends FormfieldBase {
  static styles = mwcFormfieldStyle;
}

@customElement('vwc-formfield')
export class VwcFormfield extends MwcFormfield { }
