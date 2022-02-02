import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { VWCPopupBase } from './vwc-popup-base.js';
import { style } from './vwc-popup.css.js';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-elevation';

/**
 * Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
 * Popup's goal is to provide additional, helpful content.   
 * To trigger the Popup, it should be paired with an anchor (e.g., a button).
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
