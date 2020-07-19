import '../vwc-carousel.js';
import { textToDocumentFragment, textToDomToParent, waitNextTask, waitInterval } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const
	VWC_CAROUSEL = 'vwc-carousel',
	VWC_CAROUSEL_ITEM = 'vwc-carousel-item';

describe('test vwc-carousel', () => {
	it('vwc-carousel and vwc-carousel-item are defined as a custom element', async () => {
		assert.exists(customElements.get(VWC_CAROUSEL, 'vwc-carousel element is not defined'));
		assert.exists(customElements.get(VWC_CAROUSEL_ITEM, 'vwc-carousel-item element is not defined'));
	});

	describe('init flow', () => {
		it('should have the required elements', async () => {
			const actualElements = textToDomToParent(`<${VWC_CAROUSEL} id="carousel-a"></${VWC_CAROUSEL}>`, document.body);
			await waitNextTask();
			expect(actualElements[0]).dom.to.equalSnapshot(`
				<vwc-carousel id="carousel-a" tabindex="0" autoplay=""><!---->
					<div class="upper-pane">
						<div class="swiper-nav swiper-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-disabled="true">
							<svg class="icon" viewBox="0 0 24 24">
								<path d="M14.5 4.5L8.5 12L14.5 19.5"></path>
							</svg>
						</div>
						<div class="swiper-container swiper-container-initialized swiper-container-horizontal">
							<div class="swiper-wrapper">
							</div>
						<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
						<div class="swiper-nav swiper-button-next swiper-button-disabled" tabindex="-1" role="button" aria-label="Next slide" aria-disabled="true">
							<svg class="icon" viewBox="0 0 24 24">
								<path d="M9.5 4.5L15.5 12L9.5 19.5"></path>
							</svg>
						</div>
					</div>
					<div class="lower-pane swiper-pagination"></div>
				<!----></vwc-carousel>
			`);
		});
	});

	describe('slides order', () => {
		it('should set the last carousel item before the first', async () => {
			const slides = extractSlides(await initCarousel(['a', 'b', 'c', 'd']));
			expect(slides[0].dataset.key).to.equal('d');
			expect(slides[1].dataset.key).to.equal('a');
			expect(slides[2].dataset.key).to.equal('b');
			expect(slides[3].dataset.key).to.equal('c');
			expect(slides[1].classList.contains('swiper-slide-active'));
		});

		it('should slide to the right when click on next', async function () {
			this.timeout(3000);

			const carousel = await initCarousel(['a', 'b', 'c', 'd', 'e']);
			const nextButton = carousel.querySelector('.swiper-button-next');

			nextButton.click();
			await waitInterval(50);
			let slides = extractSlides(carousel);
			expect(slides[2].dataset.key).to.equal('b');
			expect(slides[2].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(50);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('c');
			expect(slides[3].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(600);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('d');
			expect(slides[3].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(600);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('e');
			expect(slides[3].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(600);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('a');
			expect(slides[3].classList.contains('swiper-slide-active'));
		});


		it('should slide to the left when click on prev', async function () {
			this.timeout(3000);

			const carousel = await initCarousel(['a', 'b', 'c', 'd']);
			const prevButton = carousel.querySelector('.swiper-button-prev');

			prevButton.click();
			await waitInterval(600);
			let slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('d');
			expect(slides[1].classList.contains('swiper-slide-active'));

			prevButton.click();
			await waitInterval(600);
			slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('c');
			expect(slides[1].classList.contains('swiper-slide-active'));

			prevButton.click();
			await waitInterval(600);
			slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('b');
			expect(slides[1].classList.contains('swiper-slide-active'));
		});
	});

	describe('autoplay', () => {
		it('should move slides automatically when autoplay is true', async function () {
			this.timeout(4000);
			const carousel = await initCarousel(['a', 'b', 'c'], { autoplay: true });
			let slides = extractSlides(carousel);

			console.log(carousel);

			expect(slides[1].dataset.key).to.equal('a');
			expect(slides[1].classList.contains('swiper-slide-active'));

			await waitInterval(3600);

			expect(slides[1].dataset.key).to.equal('b');
			expect(slides[1].classList.contains('swiper-slide-active'));
		});
	});

	describe('click on slide', function () {
		// check that it works
		// check that it works after full rotation
	});
});

/**
 *	helper functions
 */
function buildSlidesText(keys) {
	return keys
		.map(key => `<${VWC_CAROUSEL_ITEM} data-key="${key}">Slide ${key}</${VWC_CAROUSEL_ITEM}>`)
		.join();
}

function buildCarouselText(slidesText, options) {
	const opts = Object.assign({
		autoplay: false
	}, options);

	return `
		<${VWC_CAROUSEL} autoplay="${opts.autoplay}">
			${slidesText}
		</${VWC_CAROUSEL}>
	`;
}

async function initCarousel(slideKeys, carouselOptions) {
	if (!slideKeys || !Array.isArray(slideKeys) || !slideKeys.length) {
		throw new Error(`slide keys MUST be a non-empty array, received ${slideKeys}`);
	}

	const slidesText = buildSlidesText(slideKeys);
	const carouselText = buildCarouselText(slidesText, carouselOptions);
	const carouselDOM = textToDomToParent(carouselText, document.body);

	await waitNextTask();
	return carouselDOM[0];
}

function extractSlides(carousel) {
	if (!carousel || typeof carousel.querySelectorAll !== 'function') {
		throw new Error(`carousel MUST be a carousel element, received ${carousel}`);
	}
	return carousel.querySelectorAll(`${VWC_CAROUSEL_ITEM}`);
}
