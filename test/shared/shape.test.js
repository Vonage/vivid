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
	let formElement,
		actualElement;

	before(async () => {
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
}

export async function shapePillTestCases(COMPONENT_NAME, assertDense = true) {
	const addElement = isolatedElementsCreation();
	let actualElement;

	before(async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} shape="pill"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		actualElement = e.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);
	});

	it(`${COMPONENT_NAME} should have pill shape when shape set to pill`, async () => {
		assertComputedStyle(actualElement, shapeStyles('pill'));
	});

	if (assertDense) {
		it(`${COMPONENT_NAME} should be dense when have pill shape`, async () => {
			expect(e.dense).true;
		});
	}
}

export async function shapeCircledTestCases(COMPONENT_NAME) {
	const addElement = isolatedElementsCreation();

	let formElement,
		actualElement;

	before(async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} shape="circled"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		formElement = addedElements[0];
		actualElement = formElement.shadowRoot.querySelector(topLevelSelectors[COMPONENT_NAME]);
	});


	it('should have circled shape when shape set to circled', async () => {
		assertComputedStyle(actualElement, shapeStyles('circled'));
	});
}
