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

	it('vwc-carousel with slides', async () => {
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
	});
});