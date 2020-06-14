import { customElement } from 'lit-element';
import { Fab as MWCFab } from '@material/mwc-fab';
import { style as mwcFabStyle } from '@material/mwc-fab/mwc-fab-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-fab': VWCFab;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCFab.styles = [styleCoupling, mwcFabStyle];

/**
 * This component is an extension of [<mwc-fab>](https://github.com/material-components/material-components-web-components/tree/master/packages/fab)
 */
@customElement('vwc-fab')
export class VWCFab extends MWCFab {}
