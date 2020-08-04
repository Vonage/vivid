import '../vwc-radio-list-item.js';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-radio-list-item', () => {
	it('vwc-radio-list-item is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-radio-list-item', 'vwc-radio-list-item element is not defined'));
	});
});

describe('vwc-radio-list-item init flow', () => {
	it('vwc-radio-list-item has internal contents', async () => {
		await customElements.whenDefined('vwc-radio-list-item');
		const actualElements = textToDomToParent('<vwc-radio-list-item id="radio-list-item-a">Item 0</vwc-radio-list-item>', document.body);
		await waitNextTask();
		expect(actualElements[0]).shadowDom.to.equalSnapshot();
	});
});
