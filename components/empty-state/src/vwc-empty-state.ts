import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement } from 'lit/decorators';
import { VWCEmptyStateBase } from './vwc-empty-state-base.js';
import { style } from './vwc-empty-state.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-empty-state': VWCEmptyState;
	}
}

@customElement('vwc-empty-state')
export class VWCEmptyState extends VWCEmptyStateBase {
	/**
	 * @internal
	 */
	static override styles = style;
}
