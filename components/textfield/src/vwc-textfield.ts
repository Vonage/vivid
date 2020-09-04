import { customElement, property } from 'lit-element';
import '@vonage/vwc-notched-outline';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-textfield': VWCTextField;
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];

const shapes = ['rounded', 'pill'] as const;
export type TextFieldShape = typeof shapes;

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
  @property({ type: Boolean }) dense = false;

  @property({ type: String, reflect: true })
  shape: TextFieldShape[number] = 'rounded';
  
  async firstUpdated(): Promise<void> {
    await super.firstUpdated();
    this.shadowRoot
      ?.querySelector('.mdc-notched-outline')
      ?.shadowRoot?.querySelector('.mdc-notched-outline')
      ?.classList.add('vvd-notch');
  }
}
