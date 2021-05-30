import '../vwc-icon-button-toggle.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { shapeCircledTestCases, shapeRoundedTestCases, sizingTestCases } from '../../../test/shared';
import { connotationTestCases } from '@vonage/vwc-button/test/button.connotation.test';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-icon-button-toggle';

describe.only('icon button toggle', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should have internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {
		sizingTestCases(COMPONENT_NAME);
	});

	describe('shape', () => {
		shapeRoundedTestCases(COMPONENT_NAME);
		shapeCircledTestCases(COMPONENT_NAME);
	});

	describe('icon button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
	});
});
