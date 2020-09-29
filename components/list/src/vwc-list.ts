import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { List as MWCList } from '@material/mwc-list/mwc-list';
import { style as vwcListStyle } from './vwc-list.css.js';
import { style as mwcListStyle } from '@material/mwc-list/mwc-list-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list': VWCList;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCList.styles = [styleCoupling, mwcListStyle, vwcListStyle];

/**
 * This component is an extension of [<mwc-list>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-list')
export class VWCList extends MWCList {}
