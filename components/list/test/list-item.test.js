import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
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

const VWC_LIST_ITEM = 'vwc-list-item';

describe('list item', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(VWC_LIST_ITEM, 'vwc-list-item element is not defined')
		);
	});

	describe('init flow', () => {
		it('should have internal contents', async () => {
			const actualElements = addElement(
				textToDomToParent(
					`<${VWC_LIST_ITEM} id="list-item-a">Item 0</${VWC_LIST_ITEM}>`
				)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('dimensions', () => {
		it('should have correct dimensions (one line)', async () => {
			const itemsNum = 3;
			const [listOfItems] = addElement(
				buildListOfNItems(itemsNum, VWC_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 40);
		});

		it('should have correct dimensions (two lines)', async () => {
			const itemsNum = 3;
			const [listOfItems] = addElement(
				buildListOfNItems(itemsNum, VWC_LIST_ITEM)
			);
			for (let item of listOfItems.children) {
				item.twoline = true;
			}
			await waitNextTask();
			assertListItemDimensions(listOfItems.children, itemsNum, 64);
		});
	});

	describe('spacing', () => {
		let actualElements;
		const itemsNum = 1;
		beforeEach(async () => {
			actualElements = addElement(buildListOfNItems(itemsNum, VWC_LIST_ITEM));
			await waitNextTask();
		});

		it('should have correct spacing when twoline', async () => {
			const [item] = actualElements[0].children;
			item.twoline = true;
			await waitNextTask();
			const primary = item.shadowRoot.querySelector('.mdc-deprecated-list-item__primary-text');
			const secondary = item.shadowRoot.querySelector('.mdc-deprecated-list-item__secondary-text');
			expect(primary).exist;
			expect(secondary).exist;
			const { y: primaryY, height: priamryHeight } = primary.getClientRects()[0];
			const { y: secondaryY } = secondary.getClientRects()[0];
			const distanceBetweenLines = secondaryY - (primaryY + priamryHeight);
			expect(distanceBetweenLines).to.equal(4);
		});
	});
});
