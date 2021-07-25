import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { VWCSideDrawerBase } from './vwc-side-drawer-base.js';
import { style } from './vwc-side-drawer.css.js';

@customElement('vwc-side-drawer')
export class VWCSideDrawer extends VWCSideDrawerBase {
	static styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-side-drawer': VWCSideDrawer;
	}
}
