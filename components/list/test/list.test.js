import '../vwc-list.js';
import { textToDomToParent, waitNextTask } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_LIST = 'vwc-list';

describe('list', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-list', 'vwc-list element is not defined')
		);
	});

	it('should have internal contents', async () => {
		addedElements = textToDomToParent(`<${VWC_LIST}></${VWC_LIST}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
