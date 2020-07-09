import '../vwc-carousel.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

const
	VWC_CAROUSEL = 'vwc-carousel',
	VWC_CAROUSEL_ITEM = 'vwc-carousel-item';

describe('test vwc-carousel', () => {
	it('vwc-carousel and vwc-carousel-item are defined as a custom element', async () => {
		assert.exists(customElements.get(VWC_CAROUSEL, 'vwc-carousel element is not defined'));
		assert.exists(customElements.get(VWC_CAROUSEL_ITEM, 'vwc-carousel-item element is not defined'));
	});

	it('vwc-carousel has internal contents', async () => {
		await customElements.whenDefined(VWC_CAROUSEL);
		const docFragContainer = htmlToDom(`<${VWC_CAROUSEL} id="carousel-a"></${VWC_CAROUSEL}>`);
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#carousel-a'), actualElement);
		assert.equal(actualElement.querySelectorAll('*').length, 11);
	});

	it('vwc-carousel with slides, autoplay = false', async () => {
		await customElements.whenDefined(VWC_CAROUSEL);
		const docFragContainer = htmlToDom(`
			<${VWC_CAROUSEL} id="carousel-b" autoplay="false">
				<${VWC_CAROUSEL_ITEM} id="carousel-b-slide-a">Slide A</${VWC_CAROUSEL_ITEM}>
				<${VWC_CAROUSEL_ITEM} id="carousel-b-slide-b">Slide B</${VWC_CAROUSEL_ITEM}>
				<${VWC_CAROUSEL_ITEM} id="carousel-b-slide-c">Slide C</${VWC_CAROUSEL_ITEM}>
			</${VWC_CAROUSEL}>
		`);
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#carousel-b'), actualElement);
		assert.equal(actualElement.querySelectorAll('*').length, 17);

		//	ensure slide A is visible
		const slideA = document.querySelector('#carousel-b-slide-a');
		const slideABoundingRect = slideA.getBoundingClientRect();
		const slidesViewportBoundingRect = slideA.parentNode.getBoundingClientRect();
		assert.equal(slideABoundingRect.y, slidesViewportBoundingRect.y);
		assert.equal(slideABoundingRect.width, slidesViewportBoundingRect.width);
		assert.equal(slideABoundingRect.height, slidesViewportBoundingRect.height);
		console.info(slideABoundingRect.x, slideABoundingRect.y, slideABoundingRect.width, slideABoundingRect.height);
		console.info(slidesViewportBoundingRect.x, slidesViewportBoundingRect.y, slidesViewportBoundingRect.width, slidesViewportBoundingRect.height);

		//	ensure slide B is not visible
		const slideB = document.querySelector('#carousel-b-slide-b');
		const slideBBoundingRect = slideB.getBoundingClientRect();
		assert.equal(slideBBoundingRect.y, slidesViewportBoundingRect.y);
		assert.equal(slideBBoundingRect.width, slidesViewportBoundingRect.width);
		assert.equal(slideBBoundingRect.height, slidesViewportBoundingRect.height);

		//	ensure slide C is not visible
		const slideC = document.querySelector('#carousel-b-slide-c');
		const slideCBoundingRect = slideC.getBoundingClientRect();
		assert.equal(slideCBoundingRect.y, slidesViewportBoundingRect.y);
		assert.equal(slideCBoundingRect.width, slidesViewportBoundingRect.width);
		assert.equal(slideCBoundingRect.height, slidesViewportBoundingRect.height);
	});

	it('vwc-carousel with slides, autoplay = true', async () => {
		await customElements.whenDefined(VWC_CAROUSEL);
		const docFragContainer = htmlToDom(`
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