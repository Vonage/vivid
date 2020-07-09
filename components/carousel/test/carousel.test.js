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

		//	DOM pivot index is the actual index AFTER the slides adjustements, in this case 1, since last one is pushed before the first
		assertSlidesStrip(document.querySelector('#carousel-b .swiper-wrapper'), 1)
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

function assertSlidesStrip(viewPort, domPivotIndex) {
	const viewPortRect = viewPort.getBoundingClientRect();
	for (let i = 0, l = viewPort.children.length; i < l; i++) {
		const slideRect = viewPort.children[i].getBoundingClientRect();
		assert.equal(slideRect.x, viewPortRect.x + i * viewPortRect.width);
		assert.equal(slideRect.y, viewPortRect.y);
		assert.equal(slideRect.width, viewPortRect.width);
		assert.equal(slideRect.height, viewPortRect.height);
		if (i === domPivotIndex) {
			assert.equal(slideRect.x, viewPort.parentNode.previousElementSibling.offsetWidth);
		}
	}
}