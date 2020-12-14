import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../test-helpers.js';
import {
	shapeStyles,
  topLevelSelectors,
} from '../style-utils.js';

let addElement = isolatedElementsCreation();

export async function shapeTestCases(COMPONENT_NAME) {
	let formElement, actualElement;
	beforeEach(async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		formElement = addedElements[0];
		actualElement = formElement.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);
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
