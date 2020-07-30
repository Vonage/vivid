import '../vwc-menu.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-menu', () => {
	it('vwc-menu is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-menu', 'vwc-menu element is not defined'));
	});

	it('vwc-menu has internal contents', async () => {
		await customElements.whenDefined('vwc-button');
		const docFragContainer = textToDocumentFragment('<vwc-menu id="menu-a"></vwc-menu>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#menu-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 3);
	});
});
