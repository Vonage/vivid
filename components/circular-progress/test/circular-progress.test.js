import '../vwc-circular-progress.js';
import {
	textToDocumentFragment,
	waitNextTask,
} from '../../../test/test-helpers.js';

describe('circular progress', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				'vwc-circular-progress',
				'vwc-circular-progress element is not defined'
			)
		);
	});

	it('should have internal contents', async () => {
		await customElements.whenDefined('vwc-circular-progress');
		const docFragContainer = textToDocumentFragment(
			'<vwc-circular-progress id="circular-progress-a"></vwc-circular-progress>'
		);
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#circular-progress-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 15);
	});
});
