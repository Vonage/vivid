import '../vwc-icon.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-icon', () => {
	it('vwc-icon is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-icon', 'vwc-icon element is not defined'));
	});

	it('vwc-icon has internal contents', async () => {
		await customElements.whenDefined('vwc-icon');
		const docFragContainer = textToDocumentFragment('<vwc-icon id="icon-a"></vwc-icon>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#icon-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 1);
	});
});
