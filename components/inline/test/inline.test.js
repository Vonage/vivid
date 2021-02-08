import '../vwc-inline.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const VWC_INLINE = 'vwc-inline';

describe('inline', () => {
	const addElement = isolatedElementsCreation();

	it(`${VWC_INLINE} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(VWC_INLINE, `${VWC_INLINE} element is not defined`)
		);
	});

	it('should have internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${VWC_INLINE}>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</${VWC_INLINE}>`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
