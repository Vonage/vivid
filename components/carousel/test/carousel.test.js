import '../vwc-carousel.js';
import { htmlToDom, waitNextTask, activateComponent } from '../../../utils/js/test-helpers.js';
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

	describe('HTML output', function() {
		it('should have the required elements', async () => {
			const actualElement = await activateComponent(`<${VWC_CAROUSEL} id="carousel-a"></${VWC_CAROUSEL}>`);
			expect(actualElement).dom.to.equalSnapshot();
		});
	});

	describe('slides order', function() {
		it('should set the first slide in the middle and the last before it', async function() {

			const elementsIds = ['a', 'b', 'c'];

			const carouselElements = elementsIds.map((key) => `<${VWC_CAROUSEL_ITEM} id="carousel-b-slide-${key}">Slide ${key.toUpperCase()}</${VWC_CAROUSEL_ITEM}>`)

			const elementTemplate = `
				<${VWC_CAROUSEL} id="carousel-b" autoplay="false">
					${carouselElements.join('\n')}
				</${VWC_CAROUSEL}>
			`;
			const actualElement = await activateComponent(elementTemplate);

			const carouselDOMElements = actualElement.querySelectorAll(VWC_CAROUSEL_ITEM);
			expect(carouselDOMElements[0].id).to.equal(`carousel-b-slide-${elementsIds[elementsIds.length - 1]}`);
			expect(carouselDOMElements[1].id).to.equal(`carousel-b-slide-${elementsIds[0]}`);
		});
	});

	it('vwc-carousel with slides, autoplay = false', async () => {

		assert.equal(document.querySelector('#carousel-b'), actualElement);
		assert.equal(actualElement.querySelectorAll('*').length, 17);

		//	DOM pivot index is the actual index AFTER the slides adjustements, in this case 1, since last one is pushed before the first
		assertSlidesStrip(document.querySelector('#carousel-b .swiper-wrapper'), 1);
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