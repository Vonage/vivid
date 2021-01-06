import '@vonage/vvd-core';
import { customElement, CSSResult } from 'lit-element';

import { BadgeBase } from './vwc-badge-base.js';
import { style } from './vwc-badge.css.js';

@customElement('vwc-badge')
export class Badge extends BadgeBase {
	/**
	 * Returns the average of two numbers.
	 *
	 * @remarks
	 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
	 *
	 * @param x - The first input number
	 * @param y - The second input number
	 * @returns The arithmetic mean of `x` and `y`
	 *
	 * @internal
	 */
	static styles: CSSResult = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-badge': Badge;
	}
}
