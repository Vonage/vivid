import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-button-group.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button-group': VWCButtonGroup;
	}
}

@customElement('vwc-button-group')
export class VWCButtonGroup extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;
}
