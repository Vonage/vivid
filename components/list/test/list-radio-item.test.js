import '@vonage/vwc-list';
import '../vwc-radio-list-item.js';
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
					`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`,
					document.body
				)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('typography', function () {
		it(`should have set typography correct (normal)`, async function () {
			const actualElements = addElements(
				textToDomToParent(`<${VWC_RADIO_LIST_ITEM}>Item 1</${VWC_RADIO_LIST_ITEM}>`)
			);
			await waitNextTask();
			const listItem = actualElements[0];
			expect(listItem).to.exist;
			assertComputedStyle(listItem, body2TypographyStyles);
		});

		it(`should have typography correct (selected)`, async function () {
			const actualElements = addElements(
				textToDomToParent(
					`<${VWC_RADIO_LIST_ITEM} selected>Item 1</${VWC_RADIO_LIST_ITEM}>`
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
			const itemsNum = 5;
			const actualElements = addElements(
				buildListOfNItems(itemsNum, VWC_RADIO_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 56);
		});
	});
});
