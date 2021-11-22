import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-tooltip';
import { customElement } from 'lit-element';

import { VWCPopupTipBase } from './vwc-popup-tip-base.js';
import { style } from './vwc-popup-tip.css.js';

@customElement('vwc-popup-tip')
export class VWCPopupTip extends VWCPopupTipBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-popup-tip': VWCPopupTip;
	}
}
