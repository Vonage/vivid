import '../vwc-note.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-note';

describe('note', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-note is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-note element is not defined')
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
