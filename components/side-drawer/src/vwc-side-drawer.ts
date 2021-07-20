import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-side-drawer.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-side-drawer': VWCSideDrawer;
	}
}

@customElement('vwc-side-drawer')
export class VWCSideDrawer extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	constructor() {
		super();
		this.shadowRoot ? this.shadowRoot.innerHTML = 'Hello World' : '';
	}
}
