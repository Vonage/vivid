import '../vwc-textarea.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-textarea', () => {
	it('vwc-textarea is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-textarea', 'vwc-textarea element is not defined'));
	});

	it('vwc-textarea has internal contents', async () => {
		await customElements.whenDefined('vwc-textarea');
		const docFragContainer = textToDocumentFragment('<vwc-textarea id="textarea-a"></vwc-textarea>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#textarea-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 4);
	});
});
