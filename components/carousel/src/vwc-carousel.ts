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
	private swiperContainer?: Element;

	@query('.swiper-button-next')
	private swiperButtonNext?: Element;

	@query('.swiper-button-prev')
	private swiperButtonPrev?: Element;

	@query('.swiper-pagination')
	private swiperPagination?: Element;

	firstUpdated(): void {
		try {
			this.swiperize(this.swiperContainer as HTMLElement, this.swiperOptions);
		} catch (e) {
			console.log(e);
		}
	}

	private get swiperOptions(): SwiperOptions {
		return {
			loop: true,

			autoplay: {
				delay: 2500,
				disableOnInteraction: true,
			},

			cssMode: false,
			navigation: {
				nextEl: this.swiperButtonNext as HTMLElement,
				prevEl: this.swiperButtonPrev as HTMLElement,
			},
			pagination: {
				el: this.swiperPagination as HTMLElement,
				clickable: true,
				renderBullet: function (index: number, className: string) {
					return `<span class="${className} ${index}"></span>`;
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

				<vwc-fab class="swiper-button-prev" mini icon="navigate_before"></vwc-fab>
				<vwc-fab class="swiper-button-next" mini icon="navigate_next"></vwc-fab>

				<!-- If we need scrollbar -->
				<!-- <div class="swiper-scrollbar"></div> -->
			</div>
    `;
	}
}
