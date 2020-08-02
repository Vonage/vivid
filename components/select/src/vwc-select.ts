import { customElement } from 'lit-element';
import { NotchedOutline as MWCNotchedOutline } from '@material/mwc-notched-outline';
import { style as mwcNotchedOutlineStyle } from '@material/mwc-notched-outline/mwc-notched-outline-css.js';
import { style as vwcNotchedOutlineStyle } from './vwc-notched-outline.css';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css';
import { style as mwcSelectStyle } from '@material/mwc-select/mwc-select-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCNotchedOutline.styles = [mwcNotchedOutlineStyle, vwcNotchedOutlineStyle];
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSelect.styles = [styleCoupling, mwcSelectStyle, vwcSelectStyle];

/**
 * This component is an extension of [<mwc-select>](https://github.com/material-components/material-components-web-components/tree/master/packages/select)
 */
@customElement('vwc-select')
export class VWCSelect extends MWCSelect {}
