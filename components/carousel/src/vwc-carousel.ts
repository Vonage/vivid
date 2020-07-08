import {
	customElement,
	property,
	query,
	html,
	LitElement,
	CSSResult,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-carousel.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import Swiper, { SwiperOptions } from 'swiper';
import './vwc-carousel-item.js';

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
	static get styles(): CSSResult[] {
		return [style, styleCoupling];
	}

	@property({ type: Boolean, reflect: true, converter: v => v && v === 'false' ? false : true }) autoplay = true;

	@query('.swiper-container')
	private swiperContainer?: HTMLElement;

	@query('.swiper-button-next')
	private swiperButtonNext?: HTMLElement;

	private something?: boolean;

	@query('.swiper-button-prev')
	private swiperButtonPrev?: HTMLElement;

	@query('.swiper-pagination')
	private swiperPagination?: HTMLElement;

	private swiper?: Swiper;

	firstUpdated(): void {
		this.swiper = new Swiper(this.swiperContainer as HTMLElement, this.swiperOptions);
		this.postInit();
		this.addEventListener('mouseenter', () => {
			if (this.autoplay) {
				this.swiper?.autoplay?.stop();
			}
		});
		this.addEventListener('mouseleave', () => {
			if (this.autoplay) {
				this.swiper?.autoplay?.start();
			}
		});
	}

	protected createRenderRoot(): HTMLElement {
		if (this.something) {
			return this;
		}
		return this;
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.ensureStyleApplied();
		this.tabIndex = 0;
	}

	private ensureStyleApplied() {
		VWCCarousel.styles.forEach((style, index) => {
			const tmpId = `${CAROUSEL_STYLE_ID}-${index}`;
			if (!document.head.querySelector(`#${tmpId}`)) {
				const cs = document.createElement('style');
				cs.id = tmpId;
				cs.type = 'text/css';
				cs.innerHTML = style.cssText;
				document.head.appendChild(cs);
			}
		});
	}

	private postInit(): void {
		this.postSlideToNext();
		this.postSlideToPrev();
		if (this.autoplay) {
			this.swiper?.autoplay?.start();
		}
	}

	private postSlideToNext(): void {
		// if (this.swiper && this.swiper.slides.length > 2 && this.swiper.isEnd) {
		// 	const first = this.swiper.slides[0];
		// 	this.swiper.removeSlide(0);
		// 	this.swiper.appendSlide(first);
		// }
	}

	private postSlideToPrev(): void {
		// if (this.swiper && this.swiper.slides.length > 2 && this.swiper.isBeginning) {
		// 	const last = this.swiper.slides[this.swiper.slides.length - 1];
		// 	this.swiper.removeSlide(this.swiper.slides.length - 1);
		// 	this.swiper.prependSlide(last);
		// }
	}

	private get swiperOptions(): SwiperOptions {
		return {
			loop: false,
			autoplay: this.autoplay ? {
				delay: 2500,
				disableOnInteraction: true,
			} : false,

			cssMode: false,
			navigation: {
				prevEl: this.swiperButtonPrev as HTMLElement,
				nextEl: this.swiperButtonNext as HTMLElement,
			},
			pagination: {
				el: this.swiperPagination as HTMLElement,
				clickable: true,
				renderBullet: (index: number, className: string) => {
					return `<span class="${className}">${index}</span>`;
				},
			},
			mousewheel: true,
			keyboard: true,
			on: {
				slideNextTransitionEnd: this.postSlideToNext.bind(this),
				slidePrevTransitionEnd: this.postSlideToPrev.bind(this)
			}
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
				<div class="swiper-nav swiper-button-prev">
					<svg class="icon" viewBox="0 0 24 24">
						<path d="M14.5 4.5L8.5 12L14.5 19.5"/>
					</svg>
				</div>
				<div class="swiper-container">
					<div class="swiper-wrapper">
						${slides}
					</div>
				</div>
				<div class="swiper-nav swiper-button-next">
					<svg class="icon" viewBox="0 0 24 24">
						<path d="M9.5 4.5L15.5 12L9.5 19.5"/>
					</svg>
				</div>
			</div>
			<div class="lower-pane swiper-pagination"></div>
    `;
	}
}
