import '../vwc-linear-progress.js';
import { textToDocumentFragment, waitNextTask } from '../../../test/test-helpers.js';

describe('linear progress', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-linear-progress', 'vwc-linear-progress element is not defined'));
	});

	it('should have internal contents', async () => {
		await customElements.whenDefined('vwc-linear-progress');
		const docFragContainer = textToDocumentFragment('<vwc-linear-progress id="linear-progress-a"></vwc-linear-progress>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#linear-progress-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 8);
	});
});
