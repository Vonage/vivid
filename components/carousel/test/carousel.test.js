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

	describe('init flow', function () {
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

	describe('slides order', function () {
		let actualElement;

		beforeEach(async () => {
			const elementsIds = ['a', 'b', 'c', 'd'];

			const carouselElements = elementsIds.map((key) => `<${VWC_CAROUSEL_ITEM} autoplay="false" id="carousel-b-slide-${key}">Slide ${key.toUpperCase()}</${VWC_CAROUSEL_ITEM}>`);

			const elementTemplate = `
				<${VWC_CAROUSEL} id="carousel-b" autoplay="false">
					${carouselElements.join('\n')}
				</${VWC_CAROUSEL}>
			`;

			actualElement = await activateComponent(elementTemplate);
		});

		afterEach(() => {
			actualElement.remove();
		});

		it('should set the last carousel item before the first', async function () {

			const carouselDOMElements = actualElement.querySelectorAll(VWC_CAROUSEL_ITEM);
			// check the A is swiper-slide-active
			expect(carouselDOMElements[0].id).to.equal(`carousel-b-slide-${elementsIds[elementsIds.length - 1]}`);
			expect(carouselDOMElements[1].id).to.equal(`carousel-b-slide-${elementsIds[0]}`);
		});

		it('should move slide to the right when click on next', async function () {
			// b is swiper-slide-active
			actualElement.querySelector('.swiper-container').addEventListener('transitionEnd', () => console.log('!@##@!'));
			actualElement.querySelector('.swiper-button-next').click();
			await waitInterval(1500);
		});

		it('should move slide to the right when click on next twice', function () {
			// c is swiper-slide-active and order is a,b,c,d
		});

		// TODO::test the prev motion
	});

	describe('autoplay', function () {
		// test that it works
		// test hover effects
		// decide if you want to expose the autoplay delay or hard code it
		it('should move slides automatically when autoplay is true', async () => {
			const elementsIds = ['a', 'b', 'c'];

			const carouselElements = elementsIds.map((key) => `<${VWC_CAROUSEL_ITEM} id="carousel-b-slide-${key}">Slide ${key.toUpperCase()}</${VWC_CAROUSEL_ITEM}>`);

			const elementTemplate = `
				<${VWC_CAROUSEL} id="carousel-b" autoplay="false">
					${carouselElements.join('\n')}
				</${VWC_CAROUSEL}>
			`;

			const actualElement = await activateComponent(elementTemplate);
		});
	});

	describe('click on slide', function () {
		// check that it works
		// check that it works after full rotation
	});

	it('should move slides when autoplay = true', async () => {
		await customElements.whenDefined(VWC_CAROUSEL);
		const docFragContainer = textToDocumentFragment(`
			<${VWC_CAROUSEL} id="carousel-c" autoplay="true">
				<${VWC_CAROUSEL_ITEM} id="carousel-c-slide-a">Slide A</${VWC_CAROUSEL_ITEM}>
				<${VWC_CAROUSEL_ITEM} id="carousel-c-slide-b">Slide B</${VWC_CAROUSEL_ITEM}>
			</${VWC_CAROUSEL}>
		`);
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#carousel-c'), actualElement);
		assert.equal(actualElement.querySelectorAll('*').length, 15);
	});
});