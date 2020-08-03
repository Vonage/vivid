import { customElement } from 'lit-element';
import { Drawer as MWCDrawer } from '@material/mwc-drawer';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as mwcDrawerStyle } from '@material/mwc-drawer/mwc-drawer-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-drawer': VWCDrawer;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCDrawer.styles = [mwcDrawerStyle, styleCoupling];

/**
 * This component is an extension of [<mwc-drawer>](https://github.com/material-components/material-components-web-components/tree/master/packages/drawer)
 */
@customElement('vwc-drawer')
export class VWCDrawer extends MWCDrawer {}
