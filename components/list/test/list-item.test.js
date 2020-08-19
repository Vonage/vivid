import '../vwc-list-item.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_LIST_ITEM = 'vwc-list-item';

describe('vwc-list-item', () => {
	it('vwc-list-item is defined as a custom element', () => {
		assert.exists(customElements.get(VWC_LIST_ITEM, 'vwc-list-item element is not defined'));
	});

	describe('vwc-list-item init flow', () => {
		it('vwc-list-item has internal contents', async () => {
			const actualElements = textToDomToParent(`<${VWC_LIST_ITEM} id="list-item-a">Item 0</${VWC_LIST_ITEM}>`);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('vwc-list-item typography', function () {
		it(`should have set vwc-list-item typography correct`, async function () {
			const actualElements = textToDomToParent(`<${VWC_LIST_ITEM}>Item 1</${VWC_LIST_ITEM}>`);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '22.8697px',
				letterSpacing: 'normal',
				textTransform: 'none'
			});
		});
	});
});

