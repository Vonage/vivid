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

export const THEME_ALTERNATE = 'theme-alternate';
export const VVD_THEME_ALTERNATE = 'vvd-theme-alternate';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCDrawer.styles = [styleCoupling, mwcDrawerStyle, vwcDrawerStyle];

/**
 * This component is an extension of [<mwc-drawer>](https://github.com/material-components/material-components-web-components/tree/master/packages/drawer)
 */
@customElement('vwc-drawer')
export class VWCDrawer extends MWCDrawer {
	@property({ type: Boolean, reflect: true, attribute: THEME_ALTERNATE })
	isThemeAlternate = false;

	protected updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		if (changes.has('isThemeAlternate')) {
			this.togglePart(this.isThemeAlternate);
		}
	}

	private togglePart(isAlternate: boolean) {
		const del = this.getInternalDrawerElement();
		if (!del) {
			return;
		}
		if (isAlternate) {
			del.setAttribute('part', VVD_THEME_ALTERNATE);
		} else {
			del.removeAttribute('part');
		}
	}

	private getInternalDrawerElement(): Element | null | undefined {
		return this.shadowRoot?.querySelector('.mdc-drawer');
	}
}
