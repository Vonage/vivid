import '../vwc-icon.js';
import { textToDocumentFragment, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe.only('vwc-icon', () => {
	it('vwc-icon is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-icon', 'vwc-icon element is not defined'));
	});

	it('vwc-icon has internal contents', async () => {
		const docFragContainer = textToDocumentFragment('<vwc-icon type="alarm"></vwc-icon>');
		const actualElement = docFragContainer.firstElementChild;
		document.body.appendChild(docFragContainer);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
