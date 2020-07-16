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

	@query('.swiper-button-prev')
	private swiperButtonPrev?: HTMLElement;

	@query('.swiper-pagination')
	private swiperPagination?: HTMLElement;

	private swiper?: Swiper;

	private slideRefs: HTMLElement[] = [];

	firstUpdated(): void {
		this.swiper = new Swiper(this.swiperContainer as HTMLElement, this.swiperOptions);
		this.collectSlideRefs(this.swiper);
		this.moveFirstIfNeeded(this.swiper);
		this.moveLastIfNeeded(this.swiper);
		this.renderPagination();
		this.updatePagination(this.swiper);
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
		if (this.autoplay) {
			this.swiper.autoplay?.start();
		}
	}

	protected createRenderRoot(): HTMLElement {
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

	private collectSlideRefs(swiper: Swiper): void {
		for (let i = 0, l = swiper.slides.length; i < l; i++) {
			this.slideRefs[i] = swiper.slides[i];
		}
	}

	private moveFirstIfNeeded(swiper?: Swiper): void {
		const s = swiper ?? (this as unknown as Swiper);
		if (s.slides.length > 2 && s.isEnd) {
			const first = s.slides[0];
			s.removeSlide(0);
			s.appendSlide(first);
		}
	}

	private moveLastIfNeeded(swiper?: Swiper): void {
		const s = swiper ?? (this as unknown as Swiper);
		if (s.slides.length > 2 && s.isBeginning) {
			const last = s.slides[s.slides.length - 1];
			s.removeSlide(s.slides.length - 1);
			s.prependSlide(last);
		}
	}

	private renderPagination() {
		if (this.swiperPagination) {
			const df = document.createDocumentFragment();
			for (let i = 0, l = this.slideRefs.length; i < l; i++) {
				const bullet = document.createElement('span');
				bullet.classList.add('swiper-pagination-bullet');
				bullet.addEventListener('click', this.goToSlide.bind(this));
				df.appendChild(bullet);
			}
			this.swiperPagination.appendChild(df);
		}
	}

	private updatePagination(swiper?: Swiper): void {
		if (swiper && this.swiperPagination) {
			const activeIndex = this.calculateActiveIndex(swiper);
			Array.from(this.swiperPagination.children).forEach((bullet, index) => {
				bullet.classList[index === activeIndex ? 'add' : 'remove']('swiper-pagination-bullet-active');
			});
		}
	}

	private onSlideChange(): void {
		this.updatePagination(this.swiper);
	}

	private goToSlide(event: Event): void {
		if (this.swiper && this.swiperPagination) {
			const logicalIndex = Array.from(this.swiperPagination.children).indexOf(event.target as HTMLElement);
			const domIndex = Array.from(this.swiper.wrapperEl.children).indexOf(this.slideRefs[logicalIndex]);
			if (domIndex >= 0) {
				this.swiper.slideTo(domIndex);
			}
		}
	}

	private calculateActiveIndex(swiper: Swiper): number {
		const nai = swiper.activeIndex;
		return this.slideRefs.indexOf(swiper.slides[nai]);
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
			mousewheel: true,
			keyboard: true,
			on: {
				slideNextTransitionEnd: this.moveFirstIfNeeded,
				slidePrevTransitionEnd: this.moveLastIfNeeded,
				slideChange: this.onSlideChange.bind(this)
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
