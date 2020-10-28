import '../vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
	listenToSubmission,
	changeValueAndNotify,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	borderRadiusStyles,
	body1TypographyStyles,
	body2TypographyStyles,
	captionTypographyStyles,
} from '../../../test/style-utils.js';
import {
	assertDenseStyles,
	hasNotchedOutline,
	validateOnReset,
} from '../../textfield/test/textfield-utils.test';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';
chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-select';

function getHiddenInput(formElement, fieldName) {
	return formElement.querySelector(`input[name="${fieldName}"]`);
}

describe('select', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-select element is not defined')
		);
	});

	describe('init flow', () => {
		it('should have the required elements', async () => {
			const [addedElements] = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
			);
			await waitNextTask();
			expect(addedElements).dom.to.equalSnapshot();
		});
	});

	describe(`form association`, function () {
		function createElementInForm(fieldName, values, formId, otherFormId) {
			const otherForm = otherFormId
				? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
				: '';
			return textToDomToParent(
				`<form onsubmit="return false" name="testForm" id="testForm">
									<${COMPONENT_NAME} name="${fieldName}" value="${values[1]}"
																		 ${formId ? `form="${formId}"` : ''}>
										<vwc-list-item value="${values[0]}">Item 1</vwc-list-item>
										<vwc-list-item value="${values[1]}">Item 2</vwc-list-item>
									</${COMPONENT_NAME}>
									<button></button>
								</form>
								${otherForm}`
			);
		}

		let values = [],
			fieldName,
			formId;

		beforeEach(() => {
			values = [Math.random().toString(), Math.random().toString()];
			fieldName = 'test-field';
			formId = 'testForm';
		});

		it(`should attach to closest form`, async function () {
			const [formElement] = addElement(createElementInForm(fieldName, values));
			await waitNextTask();

			const submitPromise = listenToSubmission(formElement);

			requestSubmit(formElement);

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(values[1]);
			}

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const externalFormID = 'externalForm';
			const [formElement, externalForm] = addElement(
				createElementInForm(fieldName, values, externalFormID, externalFormID)
			);
			await waitNextTask();

			const submitPromise = listenToSubmission(externalForm);

			requestSubmit(externalForm);

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(values[1]);
			}

			expect(getHiddenInput(formElement, fieldName)).to.equal(null);
			expect(
				externalForm.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should do nothing if form value resolves to a non form element`, async function () {
			const nonExistentFormId = 'noneExistentForm';
			const [formElement] = addElement(
				createElementInForm(fieldName, values, nonExistentFormId)
			);
			await waitNextTask();

			expect(formElement.querySelector('input')).to.equal(null);
		});

		describe(`value binding`, function () {
			it(`should reset the value of the custom element to default on form reset`, async function () {
				const [formElement] = addElement(createElementInForm(fieldName, values));
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();
				actualElement.value = '5';
				await waitNextTask();
				formElement.reset();

				expect(actualElement.value).to.equal(values[1]);
			});

			it(`should change the value of the mock input on internal input change`, async function () {
				const [formElement] = addElement(createElementInForm(fieldName, values));
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();

				actualElement.value = values[0];
				await waitNextTask();

				expect(getHiddenInput(formElement, fieldName).value).to.equal(values[0]);
			});
		});

		describe(`validation`, function () {
			const invalidValue = '';
			const validValue1 = Math.random().toString();
			const validValue2 = Math.random().toString();
			const valuesValidation = [validValue1, validValue2];
			let formElement, actualElement;

			beforeEach(async function () {
				[formElement] = addElement(
					createElementInForm(fieldName, valuesValidation)
				);
				actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();
			});
			it(`should get validity from the element's validationMessage`, async function () {
				await changeValueAndNotify(actualElement, invalidValue, 'change');

				const invalidity = formElement.checkValidity();

				await changeValueAndNotify(actualElement, validValue1, 'change');

				expect(invalidity).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should validate on reset`, async function () {
				validateOnReset(actualElement, formElement, invalidValue);
			});

			it(`should not submit an invalid form`, async function () {
				let submitted = false;

				await changeValueAndNotify(actualElement, invalidValue, 'change');
				const invalidity = formElement.checkValidity() === false;

				formElement.addEventListener('submit', () => {
					submitted = true;
				});

				await changeValueAndNotify(actualElement, validValue1, 'change');
				requestSubmit(formElement);

				const submittedWithAValidForm = submitted;

				submitted = false;

				await changeValueAndNotify(actualElement, invalidValue, 'change');
				requestSubmit(formElement);

				expect(invalidity, 'Should be invalid with invalid value').to.equal(true);
				expect(submittedWithAValidForm, 'Should submit with valid value').to.equal(
					true
				);
				expect(submitted).to.equal(false);
			});
		});

		it(`should work under multiple shadow layers`, async function () {
			const formTemplate = `
				<form onsubmit="return false" name="testForm" id="testForm">
					<vivid-tests-component></vivid-tests-component>
					<button></button>
				</form>`;
			const elementTemplate = `
				<${COMPONENT_NAME} required name="${fieldName}" value="${values[0]}" form="${formId}">
					<vwc-list-item value="${values[0]}">Item 1</vwc-list-item>
					<vwc-list-item value="${values[1]}">Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`;

			const [formElement] = addElement(textToDomToParent(formTemplate));
			const wrapperElement = formElement.querySelector('vivid-tests-component');
			wrapperElement.setContent(elementTemplate);
			const actualElement = wrapperElement.shadowRoot.querySelector(
				COMPONENT_NAME
			);

			const validInput = formElement.checkValidity();

			const submitPromise = listenToSubmission(formElement);

			requestSubmit(formElement);

			let invalidInput = '';
			await changeValueAndNotify(actualElement, invalidInput, 'change');

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
			expect(validInput).to.equal(true);
			expect(formElement.checkValidity()).to.equal(false);

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(values[0]);
			}
		});
	});

	describe('typography', () => {
		let addedElements, formElement, labelElement;
		beforeEach(async () => {
			addedElements = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME} outlined label="VWC Select">
					<vwc-list-item value="0">Item 1</vwc-list-item>
					<vwc-list-item value="1">Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
			);
			await waitNextTask();
			formElement = addedElements[0];
			labelElement = formElement.shadowRoot
				.querySelector('.mdc-notched-outline')
				.querySelector('#label');
		});

		it('should have set typography for a label', async () => {
			assertComputedStyle(labelElement, body1TypographyStyles);
		});

		it('should have set typography for a floating label', async () => {
			formElement.select(1);
			await waitInterval(200); // font transition
			assertComputedStyle(labelElement, captionTypographyStyles);
		});

		it('should have set typography for a selected text', async () => {
			const selectedText = formElement.shadowRoot.querySelector(
				'.mdc-select__selected-text'
			);
			assertComputedStyle(selectedText, body2TypographyStyles);
		});

		it('should have set typography for a helper', async () => {
			formElement.helper = 'Helper text';
			await waitNextTask();
			const helperElement = formElement.shadowRoot.querySelector(
				'.mdc-select-helper-text'
			);
			assertComputedStyle(helperElement, captionTypographyStyles);
		});
	});

	describe('notched outlined', () => {
		it('should have vwc-notched-outline defined', async () => {
			hasNotchedOutline(COMPONENT_NAME);
		});
	});

	describe('dense', () => {
		it('should have normal size by default', async () => {
			const addedElements = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME} outlined>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			assertComputedStyle(formElement, { height: '48px' });
		});

		it('should have dense size when dense', async () => {
			assertDenseStyles(COMPONENT_NAME);
		});
	});

	describe('shape', () => {
		it('should have rounded shape by default', async () => {
			const addedElements = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME} outlined>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.shadowRoot.querySelector('.mdc-select');

			assertComputedStyle(actualElement, borderRadiusStyles(6));
		});

		it('should have pill shape when shape set to pill', async () => {
			const addedElements = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME} outlined shape="pill">
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
			);
			await waitNextTask();
			const actualElement = addedElements[0].shadowRoot.querySelector(
				'.mdc-select'
			);
			assertComputedStyle(actualElement, borderRadiusStyles(24));
		});
	});
});
