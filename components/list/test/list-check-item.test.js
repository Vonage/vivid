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
			const [listItem] = addElements(
				textToDomToParent(
					`<${VWC_CHECK_LIST_ITEM} id="check-list-item-a">Item 0</${VWC_CHECK_LIST_ITEM}>`
				)
			);
			await listItem.updateComplete;
			expect(listItem).shadowDom.to.equalSnapshot();
		});
	});

	describe('general styling', async () => {
		it('should have correct dimensions', async () => {
			const itemsNum = 4;
			const [listOfItems] = addElements(
				buildListOfNItems(itemsNum, VWC_CHECK_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 40);
		});

		it('should have collectly positioned checkbox (right side, one line)', async () => {
			const listItem = await prepareConfiguredItem(false, false);
			const checkbox = listItem.shadowRoot.querySelector('mwc-checkbox');
			assertComputedStyle(checkbox, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, checkbox, 'right', 24);
			assertDistancePixels(listItem, checkbox, 'top', 9);
		});

		it('should have collectly positioned checkbox (left side, one line)', async () => {
			const listItem = await prepareConfiguredItem(true, false);
			const checkbox = listItem.shadowRoot.querySelector('mwc-checkbox');
			assertComputedStyle(checkbox, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, checkbox, 'left', 24);
			assertDistancePixels(listItem, checkbox, 'top', 9);
		});

		it('should have collectly positioned checkbox (right side, two lines)', async () => {
			const listItem = await prepareConfiguredItem(false, true);
			const checkbox = listItem.shadowRoot.querySelector('mwc-checkbox');
			assertComputedStyle(checkbox, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, checkbox, 'right', 24);
			assertDistancePixels(listItem, checkbox, 'top', 25);
		});

		it('should have collectly positioned checkbox (left side, two lines)', async () => {
			const listItem = await prepareConfiguredItem(true, true);
			const checkbox = listItem.shadowRoot.querySelector('mwc-checkbox');
			assertComputedStyle(checkbox, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, checkbox, 'left', 24);
			assertDistancePixels(listItem, checkbox, 'top', 25);
		});
	});

	async function prepareConfiguredItem(left = false, twoline = false) {
		const [result] = addElements(
			textToDomToParent(
				`<${VWC_CHECK_LIST_ITEM} ${left ? 'left' : ''} ${twoline ? 'twoline' : ''}>
				Item 0
				${twoline ? '<span slot="secondary">Additional info</span>' : ''}
			</${VWC_CHECK_LIST_ITEM}>`
			)
		);
		await result.updateComplete;
		return result;
	}
});
