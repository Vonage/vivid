import '@vonage/vwc-list';
import '../vwc-radio-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
	assertComputedStyle,
	assertDistancePixels
} from '../../../test/test-helpers.js';
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
					`<${VWC_RADIO_LIST_ITEM}>Item 0</${VWC_RADIO_LIST_ITEM}>`
				)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('general styling', async () => {
		it('should have correct dimensions', async () => {
			const itemsNum = 5;
			const actualElements = addElements(
				buildListOfNItems(itemsNum, VWC_RADIO_LIST_ITEM)
			);
			await waitNextTask();
			assertListItemDimensions(actualElements[0].children, itemsNum, 40);
		});

		it('should have collectly positioned radio (right side, one line)', async () => {
			const listItem = await prepareConfiguredItem(false, false);
			const radio = listItem.shadowRoot.querySelector('mwc-radio');
			assertComputedStyle(radio, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, radio, 'right', 24);
			assertDistancePixels(listItem, radio, 'top', 9);
		});

		it('should have collectly positioned radio (left side, one line)', async () => {
			const listItem = await prepareConfiguredItem(true, false);
			const radio = listItem.shadowRoot.querySelector('mwc-radio');
			assertComputedStyle(radio, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, radio, 'left', 24);
			assertDistancePixels(listItem, radio, 'top', 9);
		});

		it('should have collectly positioned radio (right side, two lines)', async () => {
			const listItem = await prepareConfiguredItem(false, true);
			const radio = listItem.shadowRoot.querySelector('mwc-radio');
			assertComputedStyle(radio, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, radio, 'right', 24);
			assertDistancePixels(listItem, radio, 'top', 25);
		});

		it('should have collectly positioned radio (left side, two lines)', async () => {
			const listItem = await prepareConfiguredItem(true, true);
			const radio = listItem.shadowRoot.querySelector('mwc-radio');
			assertComputedStyle(radio, { width: '22px', height: '22px' });
			assertDistancePixels(listItem, radio, 'left', 24);
			assertDistancePixels(listItem, radio, 'top', 25);
		});
	});

	async function prepareConfiguredItem(left = false, twoline = false) {
		const [result] = addElements(
			textToDomToParent(
				`<${VWC_RADIO_LIST_ITEM} ${left ? 'left' : ''} ${twoline ? 'twoline' : ''}>
				Item 0
				${twoline ? '<span slot="secondary">Additional info</span>' : ''}
			</${VWC_RADIO_LIST_ITEM}>`
			)
		);
		await result.updateComplete;
		return result;
	}
});
