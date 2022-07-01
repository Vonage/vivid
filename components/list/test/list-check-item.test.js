import '@vonage/vwc-list';
import '../vwc-check-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
	assertComputedStyle,
	assertDistancePixels,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	assertListItemDimensions,
	buildListOfNItems,
} from './list-items-utils.test.js';

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
			const [listItem] = addElements(
				textToDomToParent(
					`<${VWC_CHECK_LIST_ITEM} id="check-list-item-a">Item 0</${VWC_CHECK_LIST_ITEM}>`
				)
			);
			await listItem.updateComplete;
			expect(listItem).shadowDom.to.equalSnapshot();
		});
	});

	describe('dimensions', () => {
		it('should have correct dimensions (one line)', async () => {
			const itemsNum = 4;
			const [listOfItems] = addElements(
				buildListOfNItems(itemsNum, VWC_CHECK_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 40);
		});

		it('should have correct dimensions (two lines)', async () => {
			const itemsNum = 4;
			const [listOfItems] = addElements(
				buildListOfNItems(itemsNum, VWC_CHECK_LIST_ITEM)
			);
			for (let item of listOfItems.children) {
				item.twoline = true;
			}
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 72);
		});
	});
});
