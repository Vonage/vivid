import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TopAppBar as MWCTopAppBar } from '@material/mwc-top-app-bar';
import { styles as MWCTopAppBarStyles } from '@material/mwc-top-app-bar/mwc-top-app-bar.css.js';
import { style as VWCTopAppBarStyle } from './vwc-top-app-bar.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar': VWCTopAppBar;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTopAppBar.styles = [MWCTopAppBarStyles, VWCTopAppBarStyle];

/**
 * This component is an extension of [<mwc-top-app-bar>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar)
 */
@customElement('vwc-top-app-bar')
export class VWCTopAppBar extends MWCTopAppBar { }
