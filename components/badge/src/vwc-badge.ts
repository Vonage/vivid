import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement } from 'lit-element';

import { VWCBadgeBase } from './vwc-badge-base.js';
import { style } from './vwc-badge.css.js';

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information. A badge can be used to display unread notifications, or to label a block of text. Badges don’t work for navigation because they can't include a hyperlink.
 */
@customElement('vwc-badge')
export class VWCBadge extends VWCBadgeBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-badge': VWCBadge;
	}
}
