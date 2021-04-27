import '@vonage/vvd-core';
import { Menu as MWCMenu } from '@material/mwc-menu';
import { MDCMenuAdapter } from '@material/menu';
import { customElement } from 'lit-element';
import { style as mwcMenuStyle } from '@material/mwc-menu/mwc-menu-css.js';
import { style as vwcMenuStyle } from './vwc-menu.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-menu': VWCMenu;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCMenu.styles = [styleCoupling, mwcMenuStyle, vwcMenuStyle];

/**
 * This component is an extension of [<mwc-menu>](https://github.com/material-components/material-components-web-components/tree/master/packages/menu)
 */
@customElement('vwc-menu')
export class VWCMenu extends MWCMenu {
	createAdapter(): MDCMenuAdapter {
		const baseAdapter = super.createAdapter();
		const baseCloseSurface = baseAdapter.closeSurface;
		baseAdapter.closeSurface = () => {
			if (!this.multi && !this.activatable) {
				baseCloseSurface();
			}
		};
		return baseAdapter;
	}
}
