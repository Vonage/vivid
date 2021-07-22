import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-card.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-card': VWCCard;
	}
}

@customElement('vwc-card')
export class VWCCard extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;
}
