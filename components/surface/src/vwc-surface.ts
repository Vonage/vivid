import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { MenuSurfaceBase } from '@material/mwc-menu/mwc-menu-surface-base';
import { style as mwcSurfaceStyle } from '@material/mwc-menu/mwc-menu-surface-css';
import { style as vwcSurfaceStyle } from './vwc-surface.css';

export const COMPONENT_NAME = 'vwc-surface';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSurface;
	}
}

@customElement('vwc-surface')
export class VWCSurface extends MenuSurfaceBase {
	static styles = [mwcSurfaceStyle, vwcSurfaceStyle];
}
