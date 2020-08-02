import { customElement } from 'lit-element';
import { NotchedOutline as MWCNotchedOutline } from '@material/mwc-notched-outline';
import { style as mwcNotchedOutlineStyle } from '@material/mwc-notched-outline/mwc-notched-outline-css.js';
import { style as vwcNotchedOutlineStyle } from './vwc-notched-outline.css';
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
MWCNotchedOutline.styles = [mwcNotchedOutlineStyle, vwcNotchedOutlineStyle];
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {}
