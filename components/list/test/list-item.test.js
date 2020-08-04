import '../vwc-list-item.js';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-list-item', () => {
	it('vwc-list-item is defined as a custom element', () => {
		assert.exists(customElements.get('vwc-list-item', 'vwc-list-item element is not defined'));
	});
});

describe('vwc-list-item init flow', () => {
	it('vwc-list-item has internal contents', async () => {
		await customElements.whenDefined('vwc-list-item');
		const actualElements = textToDomToParent('<vwc-list-item id="list-item-a">Item 0</vwc-list-item>', document.body);
		await waitNextTask();
		expect(actualElements[0]).shadowDom.to.equalSnapshot();
	});
});
