import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation': VWCElevation;
	}
}

@customElement('vwc-elevation')
export class VWCElevation extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;
}
