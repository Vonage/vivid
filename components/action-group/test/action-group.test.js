import '../vwc-action-group.js';
import {
	isolatedElementsCreation, textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-action-group';

describe ('Action-Group', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`shape`, function () {
		it( `should have shape class to match the attribute`, async function () {
			//
		});
	});
});
