import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

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
		it('should have correct height', async () => {
			const actualElements = addElement(
				textToDomToParent(`
					<vwc-list>
						<${VWC_LIST_ITEM}>Item 1</${VWC_LIST_ITEM}>
						<${VWC_LIST_ITEM}>Item 2</${VWC_LIST_ITEM}>
						<${VWC_LIST_ITEM}>Item 3</${VWC_LIST_ITEM}>
					</vwc-list>
				`)
			);
			await waitNextTask();
			const items = actualElements[0].children;
			expect(items).exist;
			expect(items.length).equal(3);
			for (const item of items) {
				expect(item.offsetHeight).equal(48);
				assertComputedStyle(item, {
					marginTop: '0px',
					marginLeft: '0px',
					marginRight: '0px',
					marginBottom: '0px',
					height: '48px',
				});
			}
		});
	});
});
