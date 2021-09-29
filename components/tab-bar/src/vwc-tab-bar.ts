import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TabBar as MWCTabBar } from '@material/mwc-tab-bar';
import { style as vwcTabBarStyle } from './vwc-tab-bar.css.js';
import { styles as mwcTabBarStyles } from '@material/mwc-tab-bar/mwc-tab-bar.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tab-bar': VWCTabBar;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTabBar.styles = [styleCoupling, mwcTabBarStyles, vwcTabBarStyle];

@customElement('vwc-tab-bar')
export class VWCTabBar extends MWCTabBar { }
