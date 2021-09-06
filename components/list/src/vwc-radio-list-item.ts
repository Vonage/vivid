import { customElement } from 'lit-element';
import { RadioListItem as MWCRadioListItem } from '@material/mwc-list/mwc-radio-list-item';
import { styles as mwcListItemStyles } from '@material/mwc-list/mwc-list-item.css.js';
import { styles as mwcControlListItemStyles } from '@material/mwc-list/mwc-control-list-item.css.js';
import { style as vwcRadioListItemStyle } from './vwc-radio-list-item.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-radio-list-item': VWCRadioListItem;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadioListItem.styles = [
	styleCoupling,
	mwcListItemStyles,
	mwcControlListItemStyles,
	vwcRadioListItemStyle,
];

/**
 * This component is an extension of [<mwc-radio-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-radio-list-item')
export class VWCRadioListItem extends MWCRadioListItem { }
