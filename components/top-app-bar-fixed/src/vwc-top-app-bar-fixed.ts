import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TopAppBarFixedBase as MWCTopAppBarFixedBase } from '@material/mwc-top-app-bar-fixed/mwc-top-app-bar-fixed-base.js';
import { styles as MWCTopAppBarStyles } from '@material/mwc-top-app-bar/mwc-top-app-bar.css';
import { style as VWCTopAppBarStyle } from '@vonage/vwc-top-app-bar/vwc-top-app-bar.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar-fixed': VWCTopAppBarFixed;
	}
}

/**
 * This component is an extension of [<mwc-top-app-bar-fixed>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar-fixed)
 */
@customElement('vwc-top-app-bar-fixed')
export class VWCTopAppBarFixed extends MWCTopAppBarFixedBase {
	static override styles = [MWCTopAppBarStyles, VWCTopAppBarStyle];
}
