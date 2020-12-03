import '../vwc-tab-bar.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tab-bar';

describe('tab bar', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-tab-bar is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-tab-bar element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
