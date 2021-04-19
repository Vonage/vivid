import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, LitElement, CSSResult
} from 'lit-element';
import { style } from './vwc-snackbar.css';

export const COMPONENT_NAME = 'vwc-snackbar';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSnackbar;
	}
}

/**
 * `vwc-snackbar` component is designated to reflect and 'manage' state of the paged content views
 *
 * `vwc-snackbar` exposes APIs to set the `total` of pages and `selectedIndex`
 */
@customElement('vwc-snackbar')
export class VWCSnackbar extends LitElement {
	static get styles(): CSSResult[] {
		return [style];
	}
}
