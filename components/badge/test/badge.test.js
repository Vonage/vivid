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
});
