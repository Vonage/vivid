import { customElement, LitElement, html } from 'lit-element';
import { style } from './vwc-carousel-item.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel-item': VWCCarouselItem;
	}
}
/**
 * This component is a carousel
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
@customElement('vwc-carousel-item')
export class VWCCarouselItem extends LitElement {
	static get styles() {
		return style;
	}

	render() {
		return html`
			<li>
				<slot></slot>
			</li>
		`;
	}
}
