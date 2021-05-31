import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { MenuSurfaceBase } from '@material/mwc-menu/mwc-menu-surface-base';
import { style as vwcSurfaceStyle } from './vwc-surface.css';

export const COMPONENT_NAME = 'vwc-surface';
export const OPENING_EVENT = 'opening';
export const OPENED_EVENT = 'opened';
export const CLOSING_EVENT = 'closing';
export const CLOSED_EVENT = 'closed';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSurface;
	}
}

@customElement('vwc-surface')
export class VWCSurface extends MenuSurfaceBase {
	static styles = [vwcSurfaceStyle];
}
