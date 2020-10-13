import '@vonage/vwc-list';
import '../vwc-check-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_CHECK_LIST_ITEM = 'vwc-check-list-item';

describe('check list item', () => {
	let addElements = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				VWC_CHECK_LIST_ITEM,
				'vwc-check-list-item element is not defined'
			)
		);
	});

	describe('init flow', () => {
		it('should have expected HTML', async () => {
			const docFragContainer = addElements(
				textToDomToParent(
					`<${VWC_CHECK_LIST_ITEM} id="check-list-item-a">Item 0</${VWC_CHECK_LIST_ITEM}>`,
					document.body
				)
			);
			await waitNextTask();
			expect(docFragContainer[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('typography', function () {
		it(`should have set typography correct (normal)`, async function () {
			const actualElements = addElements(
				textToDomToParent(`<${VWC_CHECK_LIST_ITEM}>Item 1</${VWC_CHECK_LIST_ITEM}>`)
			);
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
				textTransform: 'none',
			});
		});

		it(`should have set typography correct (left, selected)`, async function () {
			const actualElements = addElements(
				textToDomToParent(
					`<${VWC_CHECK_LIST_ITEM} left selected>Item 1</${VWC_CHECK_LIST_ITEM}>`
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
						<${VWC_CHECK_LIST_ITEM}>Item 1</${VWC_CHECK_LIST_ITEM}>
						<${VWC_CHECK_LIST_ITEM}>Item 2</${VWC_CHECK_LIST_ITEM}>
						<${VWC_CHECK_LIST_ITEM}>Item 3</${VWC_CHECK_LIST_ITEM}>
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
