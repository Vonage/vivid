import '../vwc-icon-button.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { layoutStyles, topLevelSelectors } from '../../../test/style-utils.js';
import { sizingTestCases, shapeTestCases } from '../../../test/shared';
import { connotationTestCases } from '../../button/test/button.connotation.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-icon-button';

describe('icon button', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-icon-button is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-icon-button element is not defined')
		);
	});

	it('should internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} icon="bin"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {
		sizingTestCases(COMPONENT_NAME);
	});

	describe('shape', () => {
		shapeTestCases(COMPONENT_NAME);
	});

	describe('icon button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
	});

	describe('icon button layout', () => {
		let formElement, actualElement;
		beforeEach(async () => {
			const addedElements = addElement(
				textToDomToParent(`<${COMPONENT_NAME} icon="bin"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			formElement = addedElements[0];
			actualElement = formElement.shadowRoot.querySelector(
				topLevelSelectors[COMPONENT_NAME]
			);
		});

		it('should have ghost layout by default', async () => {
			assertComputedStyle(actualElement, layoutStyles('ghost'));
		});

		it('should have ghost layout when layout set to ghost', async () => {
			formElement.layout = 'ghost';
			await waitNextTask();
			assertComputedStyle(actualElement, layoutStyles('ghost'));
		});

		it('should have filled layout when layout set to filled', async () => {
			formElement.layout = 'filled';
			await waitNextTask();
			assertComputedStyle(actualElement, layoutStyles('filled'));
		});

		it('should have outlined layout when layout set to outlined', async () => {
			formElement.layout = 'outlined';
			await waitNextTask();
			assertComputedStyle(actualElement, layoutStyles('outlined'));
		});
	});
});
