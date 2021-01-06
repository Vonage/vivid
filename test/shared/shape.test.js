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

export async function shapeRoundedTestCases(COMPONENT_NAME) {
	const addElement = isolatedElementsCreation();

	const addedElements = addElement(
		textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
	);
	await waitNextTask();
	const formElement = addedElements[0];
	const actualElement = formElement.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);

	it('should have rounded shape by default', async () => {
		assertComputedStyle(actualElement, shapeStyles('rounded'));
	});

	it('should have rounded shape when shape set to rounded', async () => {
		formElement.shape = 'rounded';
		await waitNextTask();
		assertComputedStyle(actualElement, shapeStyles('rounded'));
	});
}

export async function shapePillTestCases(COMPONENT_NAME) {
	const addElement = isolatedElementsCreation();

	const addedElements = addElement(
		textToDomToParent(`<${COMPONENT_NAME} shape="pill"></${COMPONENT_NAME}>`)
	);
	await waitNextTask();
	const formElement = addedElements[0];
	const actualElement = formElement.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);

	it('should have pill shape when shape set to pill', async () => {
		assertComputedStyle(actualElement, shapeStyles('pill'));
	});
}

export async function shapeCircledTestCases(COMPONENT_NAME) {
	const addElement = isolatedElementsCreation();
	
	const addedElements = addElement(
		textToDomToParent(`<${COMPONENT_NAME} shape="circled"></${COMPONENT_NAME}>`)
	);
	await waitNextTask();
	const formElement = addedElements[0];
	const actualElement = formElement.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);

	it('should have circled shape when shape set to circled', async () => {
		assertComputedStyle(actualElement, shapeStyles('circled'));
	});
}
