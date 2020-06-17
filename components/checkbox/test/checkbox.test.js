import '../vwc-checkbox.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-checkbox', () => {
	it('vwc-checkbox is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-checkbox', 'vwc-checkbox element is not defined'));
	});

	it('vwc-checkbox has internal contents', async () => {
		await customElements.whenDefined('vwc-checkbox');
		const docFragContainer = htmlToDom('<vwc-checkbox id="checkbox-a"></vwc-checkbox>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#checkbox-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 6);
	});
});
