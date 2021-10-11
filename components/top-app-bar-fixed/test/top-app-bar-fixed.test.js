import '../vwc-top-app-bar-fixed.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-top-app-bar-fixed';


describe('top-app-bar-fixed', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});
});
