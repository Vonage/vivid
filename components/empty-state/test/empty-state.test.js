import '../vwc-empty-state.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-empty-state';

describe('Empty State', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should match internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}
					icon="chat-line"
					heading="Empty State Title"
					body="Empty state body for more information"
				>
				</${COMPONENT_NAME}>
			`)
		);
		await actualElement.updateComplete;

		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
