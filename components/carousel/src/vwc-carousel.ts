import '@vonage/vvd-core';
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
import SwiperCore, {
	Swiper, SwiperOptions, Autoplay, Keyboard, Mousewheel, Navigation
} from 'swiper/core';
import '@vonage/vwc-icon';
import './vwc-carousel-item.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-carousel': VWCCarousel;
	}
}

SwiperCore.use([Autoplay, Keyboard, Mousewheel, Navigation]);

/**
 * This component is a carousel
 */
@customElement('vwc-carousel')
export class VWCCarousel extends LitElement {
	@property({
		type: Boolean,
		reflect: true,
		converter: v => !(v && v === 'false'),
	})
	autoplay = true;
	@query('.swiper-container')
	private swiperContainer?: HTMLElement;
	@query('.swiper-wrapper')
	private swiperWrapper?: HTMLElement;
	@query('.swiper-pagination')
	private swiperPagination?: HTMLElement;
	@query('.swiper-button-prev')
	private prevControl?: HTMLElement;
	@query('.swiper-button-next')
	private nextControl?: HTMLElement;
	private swiper?: Swiper;
	private slideRefs: Element[] = [];

	static get styles(): CSSResult[] {
		return [style];
	}

	private get swiperOptions(): SwiperOptions {
		return {
			loop: false,
			autoplay: this.autoplay
				? {
					delay: 2500
				}
				: false,
			cssMode: false,
			keyboard: true,
			mousewheel: true,
			uniqueNavElements: true,
			navigation: {
				prevEl: this.prevControl,
				nextEl: this.nextControl,
			},
			on: {
				slideNextTransitionEnd: this.moveFirstIfNeeded,
				slidePrevTransitionEnd: this.moveLastIfNeeded,
				slideChange: this.onSlideChange.bind(this),
			},
		};
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.tabIndex = 0;
	}

	render(): TemplateResult {
		const slides = Array.from((this.firstElementChild as HTMLElement).children);
		slides.forEach((s) => {
			if (s.nodeName.toLowerCase() === 'vwc-carousel-item') {
				s.classList.add('swiper-slide');
			}
		});

		return html`
			<div class="upper-pane">
				<div class="swiper-nav swiper-button-prev">
					<vwc-icon type="left"></vwc-icon>
				</div>
				<div class="swiper-container">
					<div class="swiper-wrapper">${slides}</div>
				</div>
				<div class="swiper-nav swiper-button-next">
					<vwc-icon type="right"></vwc-icon>
				</div>
			</div>
			<div class="lower-pane swiper-pagination"></div>
		`;
	}

	protected firstUpdated(): void {
		this.swiper = new Swiper(
			this.swiperContainer as HTMLElement,
			this.swiperOptions
		);
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

	private collectSlideRefs(swiper: Swiper): void {
		const slides = swiper.slides;
		for (let i = 0, l = slides.length; i < l; i++) {
			this.slideRefs[i] = slides[i];
		}
	}

	private moveFirstIfNeeded(swiper?: Swiper): void {
		const s = swiper ?? ((this as unknown) as Swiper);
		const slides = s.slides;
		if (slides.length > 2 && s.isEnd) {
			const first = slides[0] as HTMLElement;
			s.removeSlide(0);
			s.appendSlide(first);
		}
	}

	private moveLastIfNeeded(swiper?: Swiper): void {
		const s = swiper ?? ((this as unknown) as Swiper);
		const slides = s.slides;
		if (slides.length > 2 && s.isBeginning) {
			const last = slides[slides.length - 1] as HTMLElement;
			s.removeSlide(slides.length - 1);
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
				bullet.classList[index === activeIndex ? 'add' : 'remove'](
					'swiper-pagination-bullet-active'
				);
			});
		}
	}

	private onSlideChange(): void {
		this.updatePagination(this.swiper);
	}

	private goToSlide(event: Event): void {
		if (this.swiper && this.swiperPagination && this.swiperWrapper) {
			const logicalIndex = Array.from(this.swiperPagination.children).indexOf(
				event.target as HTMLElement
			);
			const domIndex = Array.from(this.swiperWrapper.children).indexOf(
				this.slideRefs[logicalIndex]
			);
			if (domIndex >= 0) {
				this.swiper.slideTo(domIndex);
			}
		}
	}

	private calculateActiveIndex(swiper: Swiper): number {
		const nai = swiper.activeIndex;
		const slides = swiper.slides;
		return this.slideRefs.indexOf(slides[nai]);
	}
}
