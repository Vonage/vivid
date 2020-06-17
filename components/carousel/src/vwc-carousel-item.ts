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

	// TODO warn and stop initializing index if item is not contained by carousel or children are less than 1
	get children1() {
		// console.log(this.parentElement)
		return Array.prototype.slice.call(this.parentElement?.children);
	}

	get index() {
		return this.children1.indexOf(this) + 1;
	}

	get next() {
		const { index } = this;
		return this.children1.length > index ? index + 1 : 1;
	}

	get prev() {
		const { index } = this;
		return index > 1 ? index - 1 : this.children1.length;
	}

	connectedCallback() {
		super.connectedCallback();

		console.log('connected', this.index);
	}

	render() {
		const { index, next, prev } = this;
		this.setAttribute('id', `carousel__slide${index}`);
		this.setAttribute('tabindex', '0');
		return html`
			<li class="carousel__snapper">
				<slot></slot>
				<a part="tab" href="#carousel__slide${prev}" class="carousel__prev"
					>Go to last slide</a
				>
				<a href="#carousel__slide${next}" class="carousel__next"
					>Go to next slide</a
				>
			</li>
		`;
	}
}
