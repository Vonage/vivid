import '../vwc-carousel.js';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';
chai.use(chaiDomDiff);

const VWC_CAROUSEL = 'vwc-carousel',
	VWC_CAROUSEL_ITEM = 'vwc-carousel-item';

let addElement = isolatedElementsCreation();
describe('carousel', () => {
	it('vwc-carousel and vwc-carousel-item are defined as a custom element', () => {
		assert.exists(
			customElements.get(VWC_CAROUSEL, 'vwc-carousel element is not defined')
		);
		assert.exists(
			customElements.get(
				VWC_CAROUSEL_ITEM,
				'vwc-carousel-item element is not defined'
			)
		);
	});

	describe('init flow', () => {
		it('should have the required elements', async () => {
			const actualElements = addElement(
				textToDomToParent(`<${VWC_CAROUSEL} id="carousel-a"></${VWC_CAROUSEL}>`)
			);
			await waitNextTask();
			expect(actualElements[0]).dom.to.equalSnapshot();
		});
	});

	describe('slides order', () => {
		it('should set the last carousel item before the first', async () => {
			const inputSlidesIds = ['a', 'b', 'c', 'd'];
			const expectedSlidesIds = ['d', 'a', 'b', 'c'];
			const slides = extractSlides(await initCarousel(inputSlidesIds));
			expectedSlidesIds.forEach((id, index) => {
				expect(slides[index].dataset.key).to.equal(id);
			});
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
			await waitInterval(500);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('d');
			expect(slides[3].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(500);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('e');
			expect(slides[3].classList.contains('swiper-slide-active'));

			nextButton.click();
			await waitInterval(500);
			slides = extractSlides(carousel);
			expect(slides[3].dataset.key).to.equal('a');
			expect(slides[3].classList.contains('swiper-slide-active'));
		});

		it('should slide to the left when click on prev', async function () {
			this.timeout(3000);

			const carousel = await initCarousel(['a', 'b', 'c', 'd']);
			const prevButton = carousel.querySelector('.swiper-button-prev');

			prevButton.click();
			await waitInterval(500);
			let slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('d');
			expect(slides[1].classList.contains('swiper-slide-active'));

			prevButton.click();
			await waitInterval(500);
			slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('c');
			expect(slides[1].classList.contains('swiper-slide-active'));

			prevButton.click();
			await waitInterval(500);
			slides = extractSlides(carousel);
			expect(slides[1].dataset.key).to.equal('b');
			expect(slides[1].classList.contains('swiper-slide-active'));
		});
	});

	describe('autoplay', () => {
		it('should move slides automatically when autoplay is true', async function () {
			this.timeout(3000);
			const carousel = await initCarousel(['a', 'b', 'c'], { autoplay: true });
			let slides = extractSlides(carousel);

			expect(slides[1].dataset.key).to.equal('a');
			expect(slides[1].classList.contains('swiper-slide-active'));

			await waitInterval(2900);
			slides = extractSlides(carousel);

			expect(slides[1].dataset.key).to.equal('b');
			expect(slides[1].classList.contains('swiper-slide-active'));
		});
	});

	describe('click on slide', function () {
		it('should preserve click listeners of slides after sliding', async () => {
			const carousel = await initCarousel(['a', 'b', 'c']);
			const slides = extractSlides(carousel);
			const nextButton = carousel.querySelector('.swiper-button-next');

			const clicked = [];
			slides.forEach((s) =>
				s.addEventListener('click', (e) => clicked.push(e.target))
			);

			nextButton.click();
			nextButton.click();

			await waitInterval(600);

			slides.forEach((s) => s.click());
			slides.forEach((s, i) => expect(s).to.equal(clicked[i]));
		});
	});
});

/**
 *	helper functions
 */
function buildSlidesText(keys) {
	return keys
		.map(
			(key) =>
				`<${VWC_CAROUSEL_ITEM} data-key="${key}">Slide ${key}</${VWC_CAROUSEL_ITEM}>`
		)
		.join();
}

function buildCarouselText(slidesText, options) {
	const opts = Object.assign(
		{
			autoplay: false,
		},
		options
	);

	return `
		<${VWC_CAROUSEL} autoplay="${opts.autoplay}">
			${slidesText}
		</${VWC_CAROUSEL}>
	`;
}

async function initCarousel(slideKeys, carouselOptions) {
	if (!slideKeys || !Array.isArray(slideKeys) || !slideKeys.length) {
		throw new Error(
			`slide keys MUST be a non-empty array, received ${slideKeys}`
		);
	}

	const slidesText = buildSlidesText(slideKeys);
	const carouselText = buildCarouselText(slidesText, carouselOptions);
	const carouselDOM = addElement(textToDomToParent(carouselText, document.body));

	await waitNextTask();
	return carouselDOM[0];
}

function extractSlides(carousel) {
	if (!carousel || typeof carousel.querySelectorAll !== 'function') {
		throw new Error(`carousel MUST be a carousel element, received ${carousel}`);
	}
	return carousel.querySelectorAll(`${VWC_CAROUSEL_ITEM}`);
}
