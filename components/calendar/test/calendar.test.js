import '../vwc-calendar.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-calendar';

describe('calendar', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(customElements.get(COMPONENT_NAME));
	});

	it('should match internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
