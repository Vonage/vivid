import '../vwc-check-list-item.js';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-check-list-item', () => {
	it('vwc-check-list-item is defined as a custom element', () => {
		assert.exists(customElements.get('vwc-check-list-item', 'vwc-check-list-item element is not defined'));
	});
});

describe('vwc-check-list-item init flow', () => {
	it('vwc-check-list-item has expected contents', async () => {
		const docFragContainer = textToDomToParent('<vwc-check-list-item id="check-list-item-a">Item 0</vwc-check-list-item>', document.body);
		await waitNextTask();
		expect(docFragContainer[0]).shadowDom.to.equalSnapshot();
	});
});
