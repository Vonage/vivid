import '../vwc-linear-progress.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-linear-progress', () => {
	it('vwc-linear-progress is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-linear-progress', 'vwc-linear-progress element is not defined'));
	});

	it('vwc-button has internal contents', async () => {
		await customElements.whenDefined('vwc-linear-progress');
		const docFragContainer = htmlToDom('<vwc-linear-progress id="linear-progress-a">Button Text</vwc-linear-progress>');
		const actualLinearProgress = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#linear-progress-a'), actualLinearProgress);
		assert.exists(actualLinearProgress.shadowRoot);
		assert.equal(actualLinearProgress.shadowRoot.childElementCount, 1);
		assert.equal(actualLinearProgress.shadowRoot.querySelectorAll('*').length, 8);
	});
});
