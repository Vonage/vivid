import { customElement } from 'lit-element';
import { Formfield as MWCFormfield } from '@material/mwc-formfield';
import { style as vwcFormfieldStyle } from './vwc-formfield.css';
import { style as mwcFormfieldStyle } from '@material/mwc-formfield/mwc-formfield-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-formfield': VWCFormfield;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCFormfield.styles = [styleCoupling, mwcFormfieldStyle, vwcFormfieldStyle];

@customElement('vwc-formfield')
export class VWCFormfield extends MWCFormfield {}
