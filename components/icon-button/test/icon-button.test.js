import '../vwc-icon-button.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { layoutStyles, topLevelSelectors } from '../../../test/style-utils.js';
import {
	sizingTestCases,
	shapeRoundedTestCases,
	shapeCircledTestCases,
} from '../../../test/shared.js';
import { connotationTestCases } from '../../button/test/button.connotation.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

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
		shapeRoundedTestCases(COMPONENT_NAME);
		shapeCircledTestCases(COMPONENT_NAME);
	});

	describe('icon button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
	});

	describe('icon button layout', () => {
		let formElement,
			actualElement;
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

		it('should have disabled layout when disabled (filled)', async () => {
			formElement.layout = 'filled';
			formElement.disabled = true;
			await waitNextTask();
			assertComputedStyle(actualElement, { color: 'rgb(153,153,153)', backgroundColor: 'rgb(204,204,204)' });
		});

		it('should have disabled layout when disabled (outlined)', async () => {
			formElement.layout = 'outlined';
			formElement.disabled = true;
			await waitNextTask();
			assertComputedStyle(actualElement, {
				color: 'rgb(153,153,153)',
				borderTopColor: 'rgb(153,153,153)',
				borderRightColor: 'rgb(153,153,153)',
				borderBottomColor: 'rgb(153,153,153)',
				borderLeftColor: 'rgb(153,153,153)'
			});
		});
	});
});
