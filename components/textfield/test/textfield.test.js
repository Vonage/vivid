import '../vwc-textfield.js';
import { waitNextTask, textToDomToParent } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_TEXTFIELD = 'vwc-textfield';

describe.only('vwc-textfield', () => {
	it('should be defined as a custom element', async () => {
		expect(Boolean(customElements.get(VWC_TEXTFIELD))).to.equal(true);
	});

	it('should have internal contents', async () => {
		await customElements.whenDefined('vwc-textfield');
		const docFragContainer = textToDomToParent('<vwc-textfield id="textfield-a"></vwc-textfield>');
		const actualElement = docFragContainer[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
