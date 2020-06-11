import { customElement } from 'lit-element';
import { Checkbox as MWCCheckbox } from '@material/mwc-checkbox';
import { style as vwcCheckboxStyle } from './vwc-checkbox.css';
import { style as mwcCheckboxStyle } from '@material/mwc-checkbox/mwc-checkbox-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-checkbox': VWCCheckbox;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckbox.styles = [styleCoupling, mwcCheckboxStyle, vwcCheckboxStyle];

@customElement('vwc-checkbox')
export class VWCCheckbox extends MWCCheckbox {}
