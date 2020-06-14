import '../vwc-textfield.js';
import { htmlToDom, waitNextTask } from '../../../utils/js/test-helpers.js';

describe('test vwc-textfield', () => {
	it('vwc-textfield is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-textfield', 'vwc-textfield element is not defined'));
	});

	it('vwc-textfield has internal contents', async () => {
		await customElements.whenDefined('vwc-textfield');
		const docFragContainer = htmlToDom('<vwc-textfield id="textfield-a"></vwc-textfield>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		assert.equal(document.querySelector('#textfield-a'), actualElement);
		assert.exists(actualElement.shadowRoot);
		assert.equal(actualElement.shadowRoot.childElementCount, 1);
		assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 4);
	});
});
