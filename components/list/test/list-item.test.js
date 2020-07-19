import '../vwc-list-item.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-list-item', () => {
	it('vwc-list-item is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-list-item', 'vwc-list-item element is not defined'));
	});

	it('vwc-list-item has internal contents', async () => {
		await customElements.whenDefined('vwc-list-item');
		const docFragContainer = textToDocumentFragment('<vwc-list-item id="list-item-a">Item 0</vwc-list-item>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#list-item-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 2);
	});
});
