import '@vonage/vwc-list';
import '../vwc-radio-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_RADIO_LIST_ITEM = 'vwc-radio-list-item';

describe('radio list item', () => {
	let addElements = isolatedElementsCreation();

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
			const actualElements = addElements(
				textToDomToParent(
					`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`,
					document.body
				)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('typography', function () {
		it(`should have set typography correct (normal)`, async function () {
			const actualElements = addElements(
				textToDomToParent(`<${VWC_RADIO_LIST_ITEM}>Item 1</${VWC_RADIO_LIST_ITEM}>`)
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
			const actualElements = addElements(
				textToDomToParent(
					`<${VWC_RADIO_LIST_ITEM} selected>Item 1</${VWC_RADIO_LIST_ITEM}>`
				)
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

	describe('general styling', async () => {
		it('should have correct height', async () => {
			const actualElements = addElements(
				textToDomToParent(`
					<vwc-list>
						<${VWC_RADIO_LIST_ITEM}>Item 1</${VWC_RADIO_LIST_ITEM}>
						<${VWC_RADIO_LIST_ITEM}>Item 2</${VWC_RADIO_LIST_ITEM}>
						<${VWC_RADIO_LIST_ITEM}>Item 3</${VWC_RADIO_LIST_ITEM}>
					</vwc-list>
				`)
			);
			await waitNextTask();
			const items = actualElements[0].children;
			expect(items).exist;
			expect(items.length).equal(3);
			for (const item of items) {
				expect(item.offsetHeight).equal(56);
				assertComputedStyle(item, {
					marginTop: '0px',
					marginLeft: '0px',
					marginRight: '0px',
					marginBottom: '0px',
					height: '56px',
				});
			}
		});
	});
});
