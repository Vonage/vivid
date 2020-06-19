import {
	customElement,
	LitElement,
	html,
	query,
	CSSResult,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-carousel.css';
import Swiper from 'swiper';

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
	static get styles() {
		return style;
	}

	render() {
		return html`
			<section class="carousel" aria-label="Gallery">
				<ol class="carousel__viewport">
					<slot></slot>
				</ol>
				<aside class="carousel__navigation">
					<ol class="carousel__navigation-list">
						<li class="carousel__navigation-item">
							<a href="#carousel__slide1" class="carousel__navigation-button"
								>Go to slide 1</a
							>
						</li>
						<li class="carousel__navigation-item">
							<a href="#carousel__slide2" class="carousel__navigation-button"
								>Go to slide 2</a
							>
						</li>
						<li class="carousel__navigation-item">
							<a href="#carousel__slide3" class="carousel__navigation-button"
								>Go to slide 3</a
							>
						</li>
						<li class="carousel__navigation-item">
							<a href="#carousel__slide4" class="carousel__navigation-button"
								>Go to slide 4</a
							>
						</li>
					</ol>
				</aside>
			</section>
		`;
	}
}
