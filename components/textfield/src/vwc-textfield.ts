import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textfield': VWCTextField;
	}
}

// @ts-ignore
MWCTextField.styles = [mwcTextFieldStyle, vwcTextFieldStyle];

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField { }
