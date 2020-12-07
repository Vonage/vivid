import { LitElement, customElement, html, property } from 'lit-element';
import { Size } from '@vonage/vvd-foundation/constants';

import { style } from './vwc-inline.css.js';

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	@property({ type: String, reflect: true })
	size: Size = Size.Small;

	protected render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-inline': Inline;
	}
}
