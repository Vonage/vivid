import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement } from 'lit-element';

import { VWCTooltipBase } from './vwc-tooltip-base.js';
import { style } from './vwc-tooltip.css.js';

/**
 * Represents a tooltip custom element.
 * tooltip is a label that holds small amounts of information. A tooltip can be used to display unread notifications, or to label a block of text. tooltips don’t work for navigation because they can't include a hyperlink.
 */
@customElement('vwc-tooltip')
export class VWCTooltip extends VWCTooltipBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tooltip': VWCTooltip;
	}
}
