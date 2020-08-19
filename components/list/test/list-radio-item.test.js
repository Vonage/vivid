import '../vwc-radio-list-item.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_RADIO_LIST_ITEM = 'vwc-check-list-item';

describe('vwc-radio-list-item', () => {
	it('vwc-radio-list-item is defined as a custom element', async () => {
		assert.exists(customElements.get(VWC_RADIO_LIST_ITEM, 'vwc-radio-list-item element is not defined'));
	});

	describe('vwc-radio-list-item init flow', () => {
		it('vwc-radio-list-item has internal contents', async () => {
			const actualElements = textToDomToParent(`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`, document.body);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('vwc-radio-list-item typography', function () {
		it(`should have set vwc-radio-list-item (normal) typography correct`, async function () {
			const actualElements = textToDomToParent(`<${VWC_RADIO_LIST_ITEM}>Item 1</${VWC_RADIO_LIST_ITEM}>`);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				//	lineHeight: '22.8697px',
				letterSpacing: 'normal',
				textTransform: 'none'
			});
		});

		it(`should have set vwc-radio-list-item (selected) typography correct`, async function () {
			const actualElements = textToDomToParent(`<${VWC_RADIO_LIST_ITEM} selected>Item 1</${VWC_RADIO_LIST_ITEM}>`);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				//	lineHeight: '22.8697px',
				letterSpacing: 'normal',
				textTransform: 'none'
			});
		});
	});
});
