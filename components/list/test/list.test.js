import '../vwc-list.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-list', () => {
	it('vwc-list is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-list', 'vwc-list element is not defined'));
	});

	it('vwc-list has internal contents', async () => {
		await customElements.whenDefined('vwc-list');
		const docFragContainer = htmlToDom('<vwc-list id="list-a"></vwc-list>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#list-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 2);
	});
});
