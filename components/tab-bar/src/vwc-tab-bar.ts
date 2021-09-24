import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { TabBarBase as MWCTabBarBase } from '@material/mwc-tab-bar/mwc-tab-bar-base.js';
import { style as vwcTabBarStyle } from './vwc-tab-bar.css';
import { styles as mwcTabBarStyles } from '@material/mwc-tab-bar/mwc-tab-bar.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tab-bar': VWCTabBar;
	}
}

@customElement('vwc-tab-bar')
export class VWCTabBar extends MWCTabBarBase {
	static override styles = [mwcTabBarStyles, vwcTabBarStyle];
}
