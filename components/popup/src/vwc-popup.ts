import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { VWCPopupBase } from './vwc-popup-base.js';
import { style } from './vwc-popup.css.js';
import '@vonage/vwc-icon-button';

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information. A badge can be used to display unread notifications, or to label a block of text. Badges don’t work for navigation because they can't include a hyperlink.
 */

@customElement('vwc-popup')
export class VWCPopup extends VWCPopupBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-popup': VWCPopup;
	}
}
