import '../vwc-icon-button.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { shapeStyles, sizeStyles } from '../../../test/style-utils.js';
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
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {
		let formElement, actualElement;
		beforeEach(async () => {
			const addedElements = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			formElement = addedElements[0];
			actualElement = formElement.shadowRoot.querySelector('.mdc-icon-button');
		});

		it('should have normal size by default', async () => {
			assertComputedStyle(actualElement, sizeStyles('default'));
		});

		it('should have dense size when dense', async () => {
			formElement.dense = true;
			await waitNextTask();
			assertComputedStyle(actualElement, sizeStyles('dense'));
		});

		it('should have enlarged size when enlarged', async () => {
			formElement.enlarged = true;
			await waitNextTask();
			assertComputedStyle(actualElement, sizeStyles('enlarged'));
		});
	});

	describe('shape', () => {
		let formElement, actualElement;
		beforeEach(async () => {
			const addedElements = addElement(
				textToDomToParent(`<${COMPONENT_NAME} layout="filled"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			formElement = addedElements[0];
			actualElement = formElement.shadowRoot.querySelector('.mdc-icon-button');
		});

		it('should have rounded shape by default', async () => {
			assertComputedStyle(actualElement, shapeStyles('rounded'));
		});

		it('should have rounded shape when shape set to rounded', async () => {
			formElement.shape = 'rounded';
			await waitNextTask();
			assertComputedStyle(actualElement, shapeStyles('rounded'));
		});

		it('should have pill shape when shape set to pill', async () => {
			formElement.shape = 'pill';
			await waitNextTask();
			assertComputedStyle(actualElement, shapeStyles('pill'));
		});
	});
});
