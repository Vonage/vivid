import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-popup';
import { customElement } from 'lit-element';

import { VWCTooltipBase } from './vwc-tooltip-base.js';
import { style } from './vwc-tooltip.css.js';

@customElement('vwc-tooltip')
export class VwcTooltip extends VWCTooltipBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tooltip': VwcTooltip;
	}
}
