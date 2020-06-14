import { Menu as MWCMenu } from '@material/mwc-menu';
import { customElement } from 'lit-element';
//import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as mwcMenuStyle } from '@material/mwc-menu/mwc-menu-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-menu': VWCMenu;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCMenu.styles = [mwcMenuStyle];

/**
 * This component is an extension of [<mwc-menu>](https://github.com/material-components/material-components-web-components/tree/master/packages/menu)
 */
@customElement('vwc-menu')
export class VWCMenu extends MWCMenu {}
