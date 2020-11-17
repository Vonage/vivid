import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TabBar as MWCTabBar } from '@material/mwc-tab-bar';
import { style as vwcTabBarStyle } from './vwc-tab-bar.css';
import { style as mwcTabBarStyle } from '@material/mwc-tab-bar/mwc-tab-bar-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tab-bar': VWCTabBar;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTabBar.styles = [styleCoupling, mwcTabBarStyle, vwcTabBarStyle];

@customElement('vwc-tab-bar')
export class VWCTabBar extends MWCTabBar {}
