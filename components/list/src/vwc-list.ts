import '@vonage/vvd-core';
import { debounced } from '@vonage/vvd-foundation/general-utils';
import { customElement } from 'lit-element';
import { List as MWCList } from '@material/mwc-list/mwc-list';
import { style as vwcListStyle } from './vwc-list.css.js';
import { styles as mwcListStyles } from '@material/mwc-list/mwc-list.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list': VWCList;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCList.styles = [styleCoupling, mwcListStyles, vwcListStyle];

/**
 * This component is an extension of [<mwc-list>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-list')
export class VWCList extends MWCList {
	@debounced()
	override layout() {
		super.layout();
	}
}
