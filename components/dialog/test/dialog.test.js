import '../vwc-dialog.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
	awaitEvent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-dialog';

describe('Dialog', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(customElements.get(COMPONENT_NAME));
	});

	it('should have internal contents matching snapshot', async () => {
		const [actualElement] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} open><div>Content</div></${COMPONENT_NAME}>`
			)
		);
		await awaitEvent(actualElement, 'opened');
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
