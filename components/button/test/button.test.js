import '../vwc-button.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-button', () => {
	it('vwc-button is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-button', 'vwc-button element is not defined'));
	});

	it('vwc-button has internal contents', async () => {
		await customElements.whenDefined('vwc-button');
		const docFragContainer = htmlToDom('<vwc-button id="button-a">Button Text</vwc-button>');
		const actualButton = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#button-a'), actualButton);
		assert.exists(actualButton.shadowRoot);
		assert.equal(actualButton.shadowRoot.childElementCount, 1);
		assert.equal(actualButton.shadowRoot.querySelectorAll('*').length, 7);
	});
});
