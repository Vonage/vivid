import {
	assertComputedStyle,
	textToDomToParent,
	waitNextTask,
	waitInterval,
	isolatedElementsCreation,
	changeValueAndNotify,
	listenToSubmission,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

let addElement = isolatedElementsCreation();

export async function typographyTestCases(COMPONENT_NAME) {
	let addedElements, formElement, labelElement;
	beforeEach(async () => {
		addedElements = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} outlined label="Example"></${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		formElement = addedElements[0];
		labelElement = formElement.shadowRoot
			.querySelector('.mdc-notched-outline')
			.querySelector('#label');
	});

	it('should have set typography for a label', async () => {
		assertComputedStyle(labelElement, await getTypographyStyle('body-1'));
	});

	it('should have set typography for a floating label', async () => {
		formElement.value = 'hello';
		await waitInterval(200); // font transition
		assertComputedStyle(labelElement, await getTypographyStyle('caption'));
	});

	it('should have set typography for an input', async () => {
		const inputElement = formElement.shadowRoot.querySelector(
			'.mdc-text-field__input'
		);
		assertComputedStyle(inputElement, await getTypographyStyle('body-2'));
	});

	it('should have set typography for a helper', async () => {
		formElement.helper = 'Helper text';
		await waitNextTask();
		const helperElement = formElement.shadowRoot.querySelector(
			'vwc-helper-message'
		);
		assertComputedStyle(helperElement, await getTypographyStyle('caption'));
	});
}

export async function hasNotchedOutline(COMPONENT_NAME) {
	const addedElements = addElement(
		textToDomToParent(`<${COMPONENT_NAME} outlined></${COMPONENT_NAME}>`)
	);
	await waitNextTask();
	const notchedOutline = addedElements[0].shadowRoot.querySelector(
		'vwc-notched-outline'
	);
	expect(notchedOutline).to.exist;
}

export async function assertDenseStyles(COMPONENT_NAME) {
	const addedElements = addElement(
		textToDomToParent(`
    <${COMPONENT_NAME} outlined dense label="Example"></${COMPONENT_NAME}>
  `)
	);
	await waitNextTask();
	const formElement = addedElements[0];
	const labelElement = formElement.shadowRoot
		.querySelector('.mdc-notched-outline')
		.querySelector('#label');

	assertComputedStyle(formElement, {
		height: '40px',
		paddingTop: '24px',
	});

	assertComputedStyle(labelElement, {
		fontSize: '14.2222px',
		left: '-12px',
		top: '-24px',
		transform: 'none',
	});
}

export async function validateMultipleShadowLayers(COMPONENT_NAME, elementTag) {
	const fieldValue = Math.random().toString();
	const fieldName = 'test-field';
	const formTemplate = `
    <form onsubmit="return false" name="testForm" id="testForm">
      <vivid-tests-component></vivid-tests-component>
      <button></button>
    </form>`;
	const elementTemplate = `
    <${COMPONENT_NAME} required value="${fieldValue}"
      name="${fieldName}">
    </${COMPONENT_NAME}>`;
	const [formElement] = addElement(textToDomToParent(formTemplate));
	await waitNextTask();
	const wrapperElement = formElement.querySelector('vivid-tests-component');
	wrapperElement.setContent(elementTemplate);
	const actualElement = wrapperElement.shadowRoot.querySelector(COMPONENT_NAME);

	const validInput = formElement.checkValidity();
	const submitPromise = listenToSubmission(formElement);

	requestSubmit(formElement);

	for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
		expect(formDataKey).to.equal(fieldName);
		expect(formDataValue).to.equal(fieldValue);
	}

	await changeValueAndNotify(actualElement, '', 'change');

	expect(
		formElement.querySelectorAll(`${elementTag}[name="${fieldName}"`).length
	).to.equal(1);
	expect(validInput).to.equal(true);
	expect(formElement.checkValidity()).to.equal(false);
}

export async function validateOnReset(
	actualElement,
	formElement,
	invalidValue
) {
	const validInput = formElement.checkValidity();
	await changeValueAndNotify(actualElement, invalidValue, 'change');
	const invalidInput = formElement.checkValidity();

	formElement.reset();

	expect(validInput).to.equal(true);
	expect(invalidInput).to.equal(false);
	expect(formElement.checkValidity()).to.equal(true);
}
