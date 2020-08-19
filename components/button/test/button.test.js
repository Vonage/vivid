import '../vwc-button.js';
import { waitNextTask, textToDomToParent } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

describe('test vwc-button', () => {
	let addedElement;

	afterEach(() => {
		addedElement ? addedElement.remove() : '';
	});

	it('vwc-button is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-button', 'vwc-button element is not defined'));
	});

	it('vwc-button has internal contents', async () => {
		const internalElements = textToDomToParent('<vwc-button id="button-a">Button Text</vwc-button>');
		const actualElement = addedElement = internalElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
