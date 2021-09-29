import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Formfield as MWCFormfield } from '@material/mwc-formfield';
import { style as vwcFormfieldStyle } from './vwc-formfield.css.js';
import { styles as mwcFormfieldStyles } from '@material/mwc-formfield/mwc-formfield.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-formfield': VWCFormfield;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCFormfield.styles = [styleCoupling, mwcFormfieldStyles, vwcFormfieldStyle];

@customElement('vwc-formfield')
export class VWCFormfield extends MWCFormfield { }
