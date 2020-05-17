import '@vonage/vvd-core';
import { style as mwcTextAreaStyle } from '@material/mwc-textarea/mwc-textarea-css.js';
import { TextAreaBase } from '@material/mwc-textarea/mwc-textarea-base.js';
import { customElement } from 'lit-element';

export { TextFieldType } from '@material/mwc-textfield/mwc-textfield-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textarea': VwcTextArea;
  }
}

@customElement('mwc-textarea')
class MwcTextArea extends TextAreaBase {
  static styles = mwcTextAreaStyle;
}

@customElement('vwc-textarea')
export class VwcTextArea extends MwcTextArea { }
