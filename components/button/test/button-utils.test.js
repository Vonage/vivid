import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { shapeStyles, sizeStyles } from '../../../test/style-utils.js';

let addElement = isolatedElementsCreation();

export async function sizingTestCases(COMPONENT_NAME) {
	let formElement, actualElement;
	beforeEach(async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		formElement = addedElements[0];
		actualElement = formElement.shadowRoot.querySelector('button');
	});

	it('should have normal size by default', async () => {
		assertComputedStyle(actualElement, sizeStyles('default'));
	});

	it('should have dense size when dense', async () => {
		formElement.setAttribute('dense', 'true');
		await waitNextTask();
		assertComputedStyle(actualElement, sizeStyles('dense'));
	});

	it('should have enlarged size when enlarged', async () => {
		formElement.enlarged = true;
		await waitNextTask();
		assertComputedStyle(actualElement, sizeStyles('enlarged'));
	});
}

export async function shapeTestCases(COMPONENT_NAME) {
	let formElement, actualElement;
	beforeEach(async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} layout="filled"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		formElement = addedElements[0];
		actualElement = formElement.shadowRoot.querySelector('button');
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
}
