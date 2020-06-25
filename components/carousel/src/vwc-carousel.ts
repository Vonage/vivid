import {
	customElement,
	LitElement,
	html,
	query,
	CSSResult,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-carousel.css';
import Swiper, { SwiperOptions } from 'swiper';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel': VWCCarousel;
	}
}

/**
 * This component is a carousel
 */
@customElement('vwc-carousel')
export class VWCCarousel extends LitElement {
	static get styles(): CSSResult {
		return style;
	}

	@query('.swiper-container')
	private swiperContainer?: HTMLElement;

	@query('.swiper-button-next')
	private swiperButtonNext?: HTMLElement;

	@query('.swiper-button-prev')
	private swiperButtonPrev?: HTMLElement;

	@query('.swiper-pagination')
	private swiperPagination?: HTMLElement;

	firstUpdated(): void {
		this.swiperize(this.swiperContainer as HTMLElement, this.swiperOptions);
	}

	private get swiperOptions(): SwiperOptions {
		return {
			loop: true,

			autoplay: {
				delay: 2500,
				disableOnInteraction: true,
			},

			cssMode: true,
			navigation: {
				prevEl: this.swiperButtonPrev as HTMLElement,
				nextEl: this.swiperButtonNext as HTMLElement,
			},
			pagination: {
				el: this.swiperPagination as HTMLElement,
				clickable: true,
				renderBullet: function (_index: number, className: string) {
					return `<span class="${className}"></span>`;
				},
			},
			mousewheel: true,
			keyboard: true,
		};
	}

	private swiperize(el: HTMLElement, options: SwiperOptions) {
		return new Swiper(el, options);
	}

	render(): TemplateResult {
		const slides = Array.from(this.children);
		slides.forEach(e => e.classList.add('swiper-slide'));

		return html`
			<div class="swiper-container">
				<div class="swiper-wrapper">
					${[...slides]}
				</div>
				<div class="swiper-pagination"></div>

				<div class="swiper-button-prev"><vwc-icon>navigate_before</vwc-icon></div>
				<div class="swiper-button-next"><vwc-icon>navigate_next</vwc-icon></div>
			</div>
    `;
	}
}
