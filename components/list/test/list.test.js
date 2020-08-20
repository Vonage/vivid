import '../vwc-list.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-list', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-list', 'vwc-list element is not defined'));
	});

	it('should have internal contents', async () => {
		await customElements.whenDefined('vwc-list');
		const docFragContainer = textToDocumentFragment('<vwc-list id="list-a"></vwc-list>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#list-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 2);
	});
});
