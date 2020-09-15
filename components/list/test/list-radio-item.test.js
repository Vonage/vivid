import '../vwc-radio-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_RADIO_LIST_ITEM = 'vwc-radio-list-item';

describe('radio list item', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				VWC_RADIO_LIST_ITEM,
				'vwc-radio-list-item element is not defined'
			)
		);
	});

	describe('init flow', () => {
		it('should have internal contents', async () => {
			const actualElements = textToDomToParent(
				`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`,
				document.body
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('typography', function () {
		it(`should have set typography correct (normal)`, async function () {
			const actualElements = textToDomToParent(
				`<${VWC_RADIO_LIST_ITEM}>Item 1</${VWC_RADIO_LIST_ITEM}>`
			);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			const expectedStyles = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				//	lineHeight: '22.8697px',
				letterSpacing: 'normal',
				textTransform: 'none',
			};
			assertComputedStyle(listItem, expectedStyles);
		});

		it(`should have typography correct (selected)`, async function () {
			const actualElements = textToDomToParent(
				`<${VWC_RADIO_LIST_ITEM} selected>Item 1</${VWC_RADIO_LIST_ITEM}>`
			);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			const expectedStyles = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				//	lineHeight: '22.8697px',
				letterSpacing: 'normal',
				textTransform: 'none',
			};
			assertComputedStyle(listItem, expectedStyles);
		});
	});
});
