import '@vonage/vvd-core';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { style } from '@material/mwc-checkbox/mwc-checkbox-css.js';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
@customElement('mwc-checkbox')
export class Checkbox extends CheckboxBase {
  static styles = style;
}

@customElement('vwc-checkbox')
export class VWCCheckbox extends Checkbox { }

declare global {
  interface HTMLElementTagNameMap {
    'vwc-checkbox': VWCCheckbox;
  }
}
