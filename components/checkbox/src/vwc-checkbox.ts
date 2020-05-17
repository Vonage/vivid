import '@vonage/vvd-core';
import { style as mwcCheckboxStyle } from '@material/mwc-checkbox/mwc-checkbox-css.js';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base.js';
import { customElement } from 'lit-element';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-checkbox': VwcCheckbox;
  }
}

@customElement('mwc-checkbox')
class MwcCheckbox extends CheckboxBase {
  static styles = mwcCheckboxStyle;
}

@customElement('vwc-checkbox')
export class VwcCheckbox extends MwcCheckbox { }
