import '../vwc-icon-button-toggle.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { waitNextTask, textToDomToParent , isolatedElementsCreation } from '../../../test/test-helpers.js';


chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-icon-button-toggle';

describe('icon button toggle', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
