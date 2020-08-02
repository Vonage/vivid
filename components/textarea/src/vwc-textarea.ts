import { customElement } from 'lit-element';
import { NotchedOutline as MWCNotchedOutline } from '@material/mwc-notched-outline';
import { style as mwcNotchedOutlineStyle } from '@material/mwc-notched-outline/mwc-notched-outline-css.js';
import { style as vwcNotchedOutlineStyle } from './vwc-notched-outline.css';
import { TextArea as MWCTextArea } from '@material/mwc-textarea';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextareaStyle } from './vwc-textarea.css';
import { style as mwcTextareaStyle } from '@material/mwc-textarea/mwc-textarea-css.js';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textarea': VWCTextArea;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCNotchedOutline.styles = [mwcNotchedOutlineStyle, vwcNotchedOutlineStyle];
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextArea.styles = [styleCoupling, mwcTextareaStyle, vwcTextareaStyle];

/**
 * This component is an extension of [<mwc-textarea>](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)
 */
@customElement('vwc-textarea')
export class VWCTextArea extends MWCTextArea { }
