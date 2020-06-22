import { customElement, LitElement, html, TemplateResult, CSSResult } from 'lit-element';
import { style } from './vwc-carousel-item.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel-item': VWCCarouselItem;
	}
}

/**
 * This component is a carousel
 */
@customElement('vwc-carousel-item')
export class VWCCarouselItem extends LitElement {
	static get styles(): CSSResult {
		return style;
	}

	render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
