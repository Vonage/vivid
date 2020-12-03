import '../vwc-badge.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_BADGE = 'vwc-badge';

describe('badge', () => {
	const addElement = isolatedElementsCreation();

	it('vwc-badge is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_BADGE, 'vwc-badge element is not defined')
		);
	});

	it('should internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', function () {
		it(`should have set badge (text, default) typography correct`, async function () {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
			);
			await waitNextTask();
			expect(badge).to.exist;
			assertComputedStyle(badge, await getTypographyStyle('caption-bold'));
		});
	});

	describe('sizing', () => {
		it('should have normal size by default', async () => {
			const addedElements = addElement(
				textToDomToParent(`<${VWC_BADGE}>I'm a badge</${VWC_BADGE}>`)
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			assertComputedStyle(actualElement, { height: '24px' });
		});

		it('should have dense size when dense', async () => {
			const addedElements = addElement(
				textToDomToParent(`<${VWC_BADGE} dense>I'm a badge</${VWC_BADGE}>`)
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			assertComputedStyle(actualElement, { height: '20px' });
		});

		it('should have enlarged size when enlarged', async () => {
			const addedElements = addElement(
				textToDomToParent(`<${VWC_BADGE} enlarged>I'm a badge</${VWC_BADGE}>`)
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			assertComputedStyle(actualElement, { height: '28px' });
		});
	});
});
