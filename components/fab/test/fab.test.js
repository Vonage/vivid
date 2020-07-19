import '../vwc-fab.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-fab', () => {
	it('vwc-fab is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-fab', 'vwc-fab element is not defined'));
	});

	it('vwc-fab has internal contents', async () => {
		await customElements.whenDefined('vwc-fab');
		const docFragContainer = textToDocumentFragment('<vwc-fab id="fab-a"></vwc-fab>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#fab-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 3);
	});
});
