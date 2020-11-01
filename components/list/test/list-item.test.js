import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
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

	describe('typography', () => {
		it(`should have set typography correct`, async () => {
			const actualElements = addElement(
				textToDomToParent(`<${VWC_LIST_ITEM}>Item 1</${VWC_LIST_ITEM}>`)
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

		it(`should not take more than 10ms to remove the list from the DOM`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<vwc-list>${selectItems}</vwc-list>`)
			);
			await waitNextTask();
			const startTime = new Date().getTime();
			actualElement.remove();
			const endTime = new Date().getTime();

			expect(endTime - startTime).to.be.lessThan(10);
		});
	});
});
