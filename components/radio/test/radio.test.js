import '../vwc-radio.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-radio', () => {
	it('vwc-radio is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-radio', 'vwc-radio element is not defined'));
	});

	it('vwc-radio has internal contents', async () => {
		await customElements.whenDefined('vwc-radio');
		const docFragContainer = textToDocumentFragment('<vwc-radio id="radio-a" name="myGroup" value="value1"></vwc-radio>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#radio-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 6);
	});
});
