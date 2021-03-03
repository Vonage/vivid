import '@vonage/vwc-carousel';
import schemeService from '@vonage/vvd-scheme';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_CAROUSEL = 'vwc-carousel',
	VWC_CAROUSEL_ITEM = 'vwc-carousel-item';

const addElements = isolatedElementsCreation();

describe('carousel', () => {
	beforeEach(async () => {
		await schemeService.set('light');
	});

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
			const [c] = addElements(
				textToDomToParent(`<${VWC_CAROUSEL}></${VWC_CAROUSEL}>`)
			);
			await waitInterval(70);
			expect(c).dom.to.equalSnapshot();
		});
	});

	describe('slides order', () => {
		it('should set the last carousel item before the first', async () => {
			const inputSlidesIds = ['a', 'b', 'c', 'd'];
			const expectedSlidesIds = ['d', 'a', 'b', 'c'];
			const carousel = await initCarousel(inputSlidesIds);
			const slides = extractSlides(carousel);
			expectedSlidesIds.forEach((id, index) => {
				expect(slides[index].dataset.key).to.equal(id);
			});
			expect(slides[1].classList.contains('swiper-slide-active'));
			carousel.remove();
		});

		it('should slide to the right when click on next', async function () {
			this.timeout(12000);

			const c = await initCarousel(['a', 'b', 'c', 'd', 'e']);

			assertOrder(c, ['e', 'a', 'b', 'c', 'd'], 1);

			await waitInterval(20);
			await moveNextAndWait(c);
			assertOrder(c, ['e', 'a', 'b', 'c', 'd'], 2);

			await waitInterval(20);
			await moveNextAndWait(c);
			assertOrder(c, ['e', 'a', 'b', 'c', 'd'], 3);

			await waitInterval(20);
			await moveNextAndWait(c);
			assertOrder(c, ['a', 'b', 'c', 'd', 'e'], 3);

			//	back and forth in the middle
			await movePrevAndWait(c);
			assertOrder(c, ['a', 'b', 'c', 'd', 'e'], 2);
			await moveNextAndWait(c);
			assertOrder(c, ['a', 'b', 'c', 'd', 'e'], 3);

			await moveNextAndWait(c);
			assertOrder(c, ['b', 'c', 'd', 'e', 'a'], 3);

			await moveNextAndWait(c);
			assertOrder(c, ['c', 'd', 'e', 'a', 'b'], 3);

			c.remove();
		});

		it('should slide to the left when click on prev', async function () {
			this.timeout(12000);

			const c = await initCarousel(['a', 'b', 'c', 'd', 'e']);

			assertOrder(c, ['e', 'a', 'b', 'c', 'd'], 1);

			await waitInterval(20);
			await movePrevAndWait(c);
			assertOrder(c, ['d', 'e', 'a', 'b', 'c'], 1);

			await waitInterval(20);
			await movePrevAndWait(c);
			assertOrder(c, ['c', 'd', 'e', 'a', 'b'], 1);

			await waitInterval(20);
			await movePrevAndWait(c);
			assertOrder(c, ['b', 'c', 'd', 'e', 'a'], 1);

			//	back and forth in the middle
			await moveNextAndWait(c);
			assertOrder(c, ['b', 'c', 'd', 'e', 'a'], 2);
			await movePrevAndWait(c);
			assertOrder(c, ['b', 'c', 'd', 'e', 'a'], 1);

			await waitInterval(20);
			await movePrevAndWait(c);
			assertOrder(c, ['a', 'b', 'c', 'd', 'e'], 1);

			await waitInterval(20);
			await movePrevAndWait(c);
			assertOrder(c, ['e', 'a', 'b', 'c', 'd'], 1);

			c.remove();
		});
	});

	describe('autoplay', () => {
		it('should move slides automatically when autoplay is true', async function () {
			this.timeout(3000);
			const c = await initCarousel(['a', 'b', 'c'], { autoplay: true });
			let slides = extractSlides(c);

			expect(slides[1].dataset.key).to.equal('a');
			expect(slides[1].classList.contains('swiper-slide-active'));

			await waitInterval(2900);
			slides = extractSlides(c);

			expect(slides[1].dataset.key).to.equal('b');
			expect(slides[1].classList.contains('swiper-slide-active'));

			c.remove();
		});
	});

	describe('click on slide', function () {
		it('should preserve click listeners of slides after sliding', async () => {
			const c = await initCarousel(['a', 'b', 'c']);
			const slides = extractSlides(c);
			const nextButton = c.querySelector('.swiper-button-next');

			const clicked = [];
			slides.forEach((s) =>
				s.addEventListener('click', (e) => clicked.push(e.target))
			);

			nextButton.click();
			nextButton.click();

			await waitInterval(600);

			slides.forEach((s) => s.click());
			slides.forEach((s, i) => expect(s).to.equal(clicked[i]));

			c.remove();
		});
	});

	describe('styling applied', () => {
		it('should have the pagination bullets colored', async () => {
			const c = await initCarousel(['a', 'b', 'c']);
			const bullets = extractBullets(c);
			const scheme = schemeService.getSelectedScheme();
			const expectedStyleActive = {
				backgroundColor: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
			};
			const expectedStyleInactive = { backgroundColor: 'rgb(117, 117, 117)' };

			expect(bullets.length).equal(3);
			assertComputedStyle(bullets[0], expectedStyleActive);
			assertComputedStyle(bullets[1], expectedStyleInactive);
			assertComputedStyle(bullets[2], expectedStyleInactive);

			c.remove();
		});

		it('should have the navigation buttons colored', async () => {
			const c = await initCarousel(['a', 'b', 'c']);
			const navButtons = extractNavButtons(c);
			const scheme = schemeService.getSelectedScheme();
			const expectedStyle = {
				fill: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
				borderTopColor: 'rgb(153, 153, 153)',
				borderLeftColor: 'rgb(153, 153, 153)',
				borderRightColor: 'rgb(153, 153, 153)',
				borderBottomColor: 'rgb(153, 153, 153)',
			};

			expect(navButtons.length).equal(2);
			assertComputedStyle(navButtons[0], expectedStyle);
			assertComputedStyle(navButtons[1], expectedStyle);

			c.remove();
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
	const [c] = addElements(textToDomToParent(carouselText, document.body));

	await waitNextTask();
	return c;
}

function extractSlides(carousel) {
	if (!carousel || typeof carousel.querySelectorAll !== 'function') {
		throw new Error(`carousel MUST be a carousel element, received ${carousel}`);
	}
	return carousel.querySelectorAll(`${VWC_CAROUSEL_ITEM}`);
}

function extractBullets(carousel) {
	if (!carousel || typeof carousel.querySelectorAll !== 'function') {
		throw new Error(`carousel MUST be a carousel element, received ${carousel}`);
	}
	return carousel.querySelectorAll('.swiper-pagination-bullet');
}

function extractNavButtons(carousel) {
	if (!carousel || typeof carousel.querySelectorAll !== 'function') {
		throw new Error(`carousel MUST be a carousel element, received ${carousel}`);
	}
	return carousel.querySelectorAll('.swiper-nav');
}

function moveNextAndWait(carousel) {
	const nextButton = carousel.querySelector('.swiper-button-next');
	return new Promise((r) => {
		carousel.swiper.once('slideNextTransitionEnd', r);
		nextButton.click();
	});
}

function movePrevAndWait(carousel) {
	const nextButton = carousel.querySelector('.swiper-button-prev');
	return new Promise((r) => {
		carousel.swiper.once('slidePrevTransitionEnd', r);
		nextButton.click();
	});
}

function assertOrder(carousel, expectedArray, expectedActive) {
	const slides = extractSlides(carousel);
	for (let i = 0, l = slides.length; i < l; i++) {
		expect(slides[i].dataset.key).to.equal(expectedArray[i]);
	}
	expect(slides[expectedActive].classList.contains('swiper-slide-active'));
}
