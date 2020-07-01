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
import './vwc-carousel-item.js';
import '@vonage/vwc-icon/vwc-icon.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel': VWCCarousel;
	}
}

const CAROUSEL_STYLE_ID = 'vwc-carousel-style-id';

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
		const swiper = new Swiper(this.swiperContainer as HTMLElement, this.swiperOptions);
		this.addEventListener('mouseenter', () => {
			swiper.autoplay?.stop();
		});
		this.addEventListener('mouseleave', () => {
			swiper.autoplay?.start();
		});
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.ensureStyleApplied();
	}

	private ensureStyleApplied() {
		if (!document.head.querySelector(`#${CAROUSEL_STYLE_ID}`)) {
			const cs = document.createElement('style');
			cs.id = CAROUSEL_STYLE_ID;
			cs.type = 'text/css';
			cs.innerHTML = VWCCarousel.styles.cssText;
			document.head.appendChild(cs);
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

	render(): TemplateResult {
		const slides = Array.from(this.children);
		slides.forEach(s => {
			if (s.nodeName.toLowerCase() === 'vwc-carousel-item') {
				s.classList.add('swiper-slide');
			}
		});

		return html`
			<div class="upper-pane">
				<div class="swiper-nav swiper-button-prev"><vwc-icon>navigate_before</vwc-icon></div>
				<div class="swiper-container">
					<div class="swiper-wrapper">
						${slides}
					</div>
				</div>
				<div class="swiper-nav swiper-button-next"><vwc-icon>navigate_next</vwc-icon></div>
			</div>
			<div class="lower-pane swiper-pagination"></div>
    `;
	}
}
