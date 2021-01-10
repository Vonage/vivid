import { customElement, LitElement } from 'lit-element';
import { style as vwcLoadingVeilStyle } from './vwc-loading-veil.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-loading-veil': VWCLoadingVeil;
	}
}

@customElement('vwc-loading-veil')
export class VWCLoadingVeil extends LitElement {
	static styles = [vwcLoadingVeilStyle];
}
