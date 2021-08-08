import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { VWCSideDrawerBase } from './vwc-side-drawer-base.js';
import { style } from './vwc-side-drawer.css.js';

/**
 * Represents a side drawer custom element.
 *
 * @alpha
 */
@customElement('vwc-side-drawer')
export class VWCSideDrawer extends VWCSideDrawerBase {
	/**
	 * assign styles
	 * @internal
	 * */
	static styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-side-drawer': VWCSideDrawer;
	}
}
