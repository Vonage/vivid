import '../vwc-text.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import { shapeStyles } from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_TEXT = 'vwc-text';

describe('vwc-text', () => {
	const addElement = isolatedElementsCreation();

	it(`${VWC_TEXT} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(VWC_TEXT, `${VWC_TEXT} element is not defined`)
		);
	});

	it('should internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${VWC_TEXT}>Lorem ipsum</${VWC_TEXT}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
