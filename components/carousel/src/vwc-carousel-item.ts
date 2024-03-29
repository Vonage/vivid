import { customElement } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel-item': VWCCarouselItem;
	}
}

/**
 * This component is a carousel's item wrapper
 */
@customElement('vwc-carousel-item')
export class VWCCarouselItem extends HTMLElement {}
