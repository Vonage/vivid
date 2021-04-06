import '../vwc-inline.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_INLINE = 'vwc-inline';
const inlineHtmlStr = `<${VWC_INLINE}>
	<span>1</span>
	<span>2</span>
	<span>3</span>
	<span>4</span>
</${VWC_INLINE}>`;

const getNewElement = () => isolatedElementsCreation()(textToDomToParent(inlineHtmlStr))[0];

describe(VWC_INLINE, () => {
	describe('basics', () => {
		it(`${VWC_INLINE} is defined as a custom element`, async () => {
			assert.exists(
				customElements.get(VWC_INLINE, `${VWC_INLINE} element is not defined`)
			);
		});

		it('should have internal contents', async () => {
			const actualElement = getNewElement();
			await waitNextTask();
			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});
	});

	describe('API', () => {
		it(`should be set to auto-fit`, async () => {
			const actualElement = getNewElement();
			await waitNextTask();
			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});
	});
});
