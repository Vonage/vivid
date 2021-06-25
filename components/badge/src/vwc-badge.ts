import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { VWCBadgeBase } from './vwc-badge-base.js';
import { style } from './vwc-badge.css.js';

@customElement('vwc-badge')
export class VWCBadge extends VWCBadgeBase {
	static styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-badge': VWCBadge;
	}
}
