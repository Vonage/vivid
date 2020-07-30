import { customElement } from 'lit-element';
import { RadioListItem as MWCRadioListItem } from '@material/mwc-list/mwc-radio-list-item';
import { style as mwcListItemStyle } from '@material/mwc-list/mwc-list-item-css.js';
import { style as mwcControlListItemStyle } from '@material/mwc-list/mwc-control-list-item-css.js';
import { style as vwcRadioListItemStyle } from './vwc-radio-list-item.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-radio-list-item': VWCRadioListItem;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadioListItem.styles = [styleCoupling, mwcListItemStyle, mwcControlListItemStyle, vwcRadioListItemStyle];

/**
 * This component is an extension of [<mwc-radio-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-radio-list-item')
export class VWCRadioListItem extends MWCRadioListItem { }
