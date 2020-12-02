import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { BadgeCombinedBase } from './vwc-badge-combined-base.js';
import { style } from './vwc-badge-combined.css.js';

@customElement('vwc-badge-combined')
export class BadgeCombined extends BadgeCombinedBase {
	static styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-badge-combined': BadgeCombined;
	}
}
