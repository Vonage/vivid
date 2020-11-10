import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { Drawer as MWCDrawer } from '@material/mwc-drawer';
import { style as vwcDrawerStyle } from './vwc-drawer.css';
import { style as mwcDrawerStyle } from '@material/mwc-drawer/mwc-drawer-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-drawer': VWCDrawer;
	}
}

const THEME_ALTERNATE = 'themeAlternate';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCDrawer.styles = [styleCoupling, mwcDrawerStyle, vwcDrawerStyle];

/**
 * This component is an extension of [<mwc-drawer>](https://github.com/material-components/material-components-web-components/tree/master/packages/drawer)
 */
@customElement('vwc-drawer')
export class VWCDrawer extends MWCDrawer {
	@property({ type: Boolean, reflect: true, attribute: 'theme-alternate' })
	[THEME_ALTERNATE] = false;

	protected updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		if (changes.has(THEME_ALTERNATE)) {
			const drawerEl = this.shadowRoot?.querySelector('.mdc-drawer');
			if (this[THEME_ALTERNATE]) {
				drawerEl?.setAttribute('part', 'vvd-theme-alternate');
			} else {
				drawerEl?.removeAttribute('part');
			}
		}
	}
}
