import { LitElement, customElement, html, TemplateResult } from 'lit-element';
import { style as vwcElevationOverlayStyle } from './vwc-elevation-overlay.css.js';
import { style as mwcElevationOverlayStyle } from '@material/mwc-elevation-overlay/mwc-elevation-overlay-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation-overlay': VWCElevationOverlay;
	}
}

/**
 * This component is an extension of [<mwc-elevation-overlay>](https://github.com/material-components/material-components-web-components/tree/master/packages/elevation-overlay)
 * This component is NOT meant to be used itself, but serves as an adjustment/definition for the usage of it in other components
 */
@customElement('vwc-elevation-overlay')
export class VWCElevationOverlay extends LitElement {
	static get styles() {
		return [mwcElevationOverlayStyle, vwcElevationOverlayStyle];
	}

	protected render(): TemplateResult {
		return html`<div class="mdc-elevation-overlay"></div>`;
	}
}
