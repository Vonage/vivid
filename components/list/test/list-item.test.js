import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	assertComputedStyle,
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { borderRadiusStyles, shapeStyles } from '../../../test/style-utils';
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

	describe('sizing', () => {
		let actualElements;
		const itemsNum = 3;
		beforeEach(async () => {
			actualElements = addElement(buildListOfNItems(itemsNum, VWC_LIST_ITEM));
			await waitNextTask();
		});

		it('should have correct size by default', async () => {
			assertListItemDimensions(actualElements[0].children, itemsNum, 40);
		});

		it('should have correct size when twoline', async () => {
			for (let item of actualElements[0].children) item.twoline = true;
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 64);
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

	describe(`performance issue`, () => {
		function createElement(index) {
			return `<vwc-list-item value=${index}>Item ${index}</vwc-list-item>`;
		}
		const selectItems = new Array(300)
			.fill(0)
			.map((_, index) => index)
			.reduce((last, next) => (last += createElement(next)), '');

		it(`should not take more than 50ms to remove the list from the DOM`, async () => {
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
