import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	assertListItemDimensions,
	buildListOfNItems,
} from './list-items-check-utils.test.js';

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

	// ! typography is defined by context
	describe('typography', () => {
		it(`should have set typography correct (normal)`, async () => {
			const [list] = addElement(
				textToDomToParent(
					`<vwc-list><${VWC_LIST_ITEM}>Item 1</${VWC_LIST_ITEM}></vwc-list>`
				)
			);
			await waitNextTask();
			const listItem = list.children[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, await getTypographyStyle('body-2'));
		});

		it(`should have typography correct (selected)`, async function () {
			const [list] = addElement(
				textToDomToParent(
					`<vwc-list><${VWC_LIST_ITEM} selected>Item 1</${VWC_LIST_ITEM}></vwc-list>`
				)
			);
			await waitNextTask();
			const listItem = list.children[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, await getTypographyStyle('body-2'));
		});
	});

	describe('general styling', async () => {
		it('should have correct dimensions', async () => {
			const itemsNum = 3;
			const actualElements = addElement(
				buildListOfNItems(itemsNum, VWC_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 48);
		});
	});

	describe(`performance issue`, function () {
		function createElement(index) {
			return `<vwc-list-item value=${index}>Item ${index}</vwc-list-item>`;
		}
		const selectItems = new Array(300)
			.fill(0)
			.map((_, index) => index)
			.reduce((last, next) => (last += createElement(next)), '');

		it(`should not take more than 50ms to remove the list from the DOM`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<vwc-list>${selectItems}</vwc-list>`)
			);
			await waitNextTask();
			const startTime = performance.now();
			actualElement.remove();
			const endTime = performance.now();

			expect(endTime - startTime).to.be.lessThan(50);
		});
	});
});
