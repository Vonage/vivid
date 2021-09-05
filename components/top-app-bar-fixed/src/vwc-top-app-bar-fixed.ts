import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TopAppBarFixed as MWCTopAppBarFixed } from '@material/mwc-top-app-bar-fixed';
import { styles as MWCTopAppBarStyles } from '@material/mwc-top-app-bar/mwc-top-app-bar.css.js';
import { style as VWCTopAppBarFixedStyle } from './vwc-top-app-bar-fixed.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-top-app-bar-fixed': VWCTopAppBarFixed;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTopAppBarFixed.styles = [styleCoupling, MWCTopAppBarStyles, VWCTopAppBarFixedStyle];

/**
 * This component is an extension of [<mwc-top-app-bar-fixed>](https://github.com/material-components/material-components-web-components/tree/master/packages/top-app-bar-fixed)
 */
@customElement('vwc-top-app-bar-fixed')
export class VWCTopAppBarFixed extends MWCTopAppBarFixed { }
