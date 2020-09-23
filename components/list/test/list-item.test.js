import '../vwc-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_LIST_ITEM = 'vwc-list-item';

describe('list item', () => {
	let addedElements = [];

	afterEach(function () {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(VWC_LIST_ITEM, 'vwc-list-item element is not defined')
		);
	});

	describe('init flow', () => {
		it('should have internal contents', async () => {
			const actualElements = (addedElements = textToDomToParent(
				`<${VWC_LIST_ITEM} id="list-item-a">Item 0</${VWC_LIST_ITEM}>`
			));
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot();
		});
	});

	describe('typography', function () {
		it(`should have set typography correct`, async function () {
			const actualElements = (addedElements = textToDomToParent(
				`<${VWC_LIST_ITEM}>Item 1</${VWC_LIST_ITEM}>`
			));
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
});
