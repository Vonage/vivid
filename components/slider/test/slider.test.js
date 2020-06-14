import '../vwc-slider.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-slider', () => {
	it('vwc-slider is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-slider', 'vwc-slider element is not defined'));
	});

	it('vwc-slider has internal contents', async () => {
		await customElements.whenDefined('vwc-slider');
		const docFragContainer = htmlToDom('<vwc-slider id="slider-a"></vwc-slider>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#slider-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 7);
	});
});
