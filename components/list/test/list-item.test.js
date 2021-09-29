import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import {
	assertComputedStyle,
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { borderRadiusStyles, shapeStyles } from '../../../test/style-utils.js';
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

	describe('connotation', () => {
		let listItem,
			ripple;
		beforeEach(async () => {
			[listItem] = addElement(
				textToDomToParent(`<vwc-list-item activated>Item 1</vwc-list-item>`)
			);
			await waitNextTask();
			ripple = listItem.shadowRoot.querySelector('.fake-activated-ripple');
		});

		it('should proxy primary connotation to activated list-item by default', async () => {
			assertComputedStyle(ripple, { backgroundColor: 'rgb(0,0,0)' }, ':before');
		});

		it('should proxy cta connotation to activated list-item when connotation set to cta', async () => {
			listItem.connotation = 'cta';
			await waitNextTask();
			assertComputedStyle(ripple, { backgroundColor: 'rgb(153,65,255)' }, ':before');
		});
	});

	describe('shape', () => {
		let actualElement;
		beforeEach(async () => {
			const addedElements = addElement(
				textToDomToParent(`<${VWC_LIST_ITEM}>Item 0</${VWC_LIST_ITEM}>`)
			);
			actualElement = addedElements[0];
			await waitNextTask();
		});

		it('should have no shape by default', async () => {
			assertComputedStyle(actualElement, borderRadiusStyles('0px'));
		});

		it('should have rounded shape when shape set to rounded', async () => {
			actualElement.shape = 'rounded';
			await waitNextTask();
			assertComputedStyle(actualElement, shapeStyles('rounded'));
		});
	});
});
