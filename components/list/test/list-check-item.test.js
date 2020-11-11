import '@vonage/vwc-list';
import '../vwc-check-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { body2TypographyStyles } from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	assertListItemDimensions,
	buildListOfNItems,
} from './list-items-check-utils.test.js';

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
			assertComputedStyle(listItem, body2TypographyStyles);
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
			assertComputedStyle(listItem, body2TypographyStyles);
		});
	});

	describe('general styling', async () => {
		it('should have correct dimensions', async () => {
			const itemsNum = 4;
			const actualElements = addElements(
				buildListOfNItems(itemsNum, VWC_CHECK_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 56);
		});
	});
});
