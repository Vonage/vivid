import '../vwc-checkbox.js';
import {
	textToDocumentFragment,
	waitNextTask,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { textToDomToParent } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-checkbox';

describe('checkbox', () => {
	let addedElements = [];

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-checkbox', 'vwc-checkbox element is not defined')
		);
	});

	it('should have internal contents', async () => {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
