import { COMPONENT_NAME } from '@vonage/vwc-dropdown';
import '@vonage/vwc-button';
import {
	isolatedElementsCreation,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('dropdown', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-dropdown element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [dropdown] = addElement(textToDomToParent(
			`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
		));
		await dropdown.updateComplete;
		expect(dropdown.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
