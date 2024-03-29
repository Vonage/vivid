import '@vonage/vwc-list';
import '../vwc-radio-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	assertListItemDimensions,
	buildListOfNItems,
} from './list-items-utils.test.js';

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
					`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`
				)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('dimensions', () => {
		it('should have correct dimensions (one line)', async () => {
			const itemsNum = 5;
			const actualElements = addElements(
				buildListOfNItems(itemsNum, VWC_RADIO_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 40);
		});

		it('should have correct dimensions (two lines)', async () => {
			const itemsNum = 4;
			const [listOfItems] = addElements(
				buildListOfNItems(itemsNum, VWC_RADIO_LIST_ITEM)
			);
			for (let item of listOfItems.children) {
				item.twoline = true;
			}
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 72);
		});
	});
});
