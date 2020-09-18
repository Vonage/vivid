import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TopAppBarFixed as MWCTopAppBarFixed } from '@material/mwc-top-app-bar-fixed';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar-fixed': VWCTopAppBarFixed;
	}
}

/**
 * This component is an extension of [<mwc-top-app-bar-fixed>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar-fixed)
 */
@customElement('vwc-top-app-bar-fixed')
export class VWCTopAppBarFixed extends MWCTopAppBarFixed {}
