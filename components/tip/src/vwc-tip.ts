import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-tooltip';
import { customElement } from 'lit-element';

import { VWCTipBase } from './vwc-tip-base.js';
import { style } from './vwc-tip.css.js';

@customElement('vwc-tip')
export class VWCTip extends VWCTipBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tip': VWCTip;
	}
}
