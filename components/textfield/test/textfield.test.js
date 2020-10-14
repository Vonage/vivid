import '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
	changeValueAndNotify,
	isolatedElementsCreation,
	randomAlpha,
	listenToSubmission,
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
	validateMultipleShadowLayers,
	validateOnReset,
} from './textfield-utils.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

function getHiddenInput(formElement, fieldName) {
	return formElement.querySelector(`input[name="${fieldName}"]`);
}

describe('textfield', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		expect(Boolean(customElements.get(COMPONENT_NAME))).to.equal(true);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', () => {
		let addedElements, formElement, labelElement;
		beforeEach(async () => {
			addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined label="Vwc textarea"></${COMPONENT_NAME}>`
				)
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
			formElement.value = 'hello';
			await waitInterval(200); // font transition
			assertComputedStyle(labelElement, captionTypographyStyles);
		});

		it('should have set typography for an input', async () => {
			const inputElement = formElement.shadowRoot.querySelector(
				'.mdc-text-field__input'
			);
			assertComputedStyle(inputElement, body2TypographyStyles);
		});
	});

	describe(`form association`, function () {
		function createElementInForm(fieldName, fieldValue, formId, otherFormId) {
			const otherForm = otherFormId
				? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
				: '';
			return textToDomToParent(
				`<form onsubmit="return false" name="testForm" id="testForm">
									<${COMPONENT_NAME} name="${fieldName}"
																		 value="${fieldValue}"
																		 ${formId ? `form="${formId}"` : ''}>

									</${COMPONENT_NAME}>
									<button></button>
								</form>
								${otherForm}`
			);
		}

		let fieldValue, fieldName;
		beforeEach(function () {
			fieldValue = Math.random().toString();
			fieldName = 'test-field';
		});

		it(`should attach to closest form`, async function () {
			const [formElement] = addElement(createElementInForm(fieldName, fieldValue));
			await waitNextTask();

			const submitPromise = listenToSubmission(formElement);

			requestSubmit(formElement);

			for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
				expect(formDataKey).to.equal(fieldName);
				expect(formDataValue).to.equal(fieldValue);
			}

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const externalFormID = randomAlpha();

			const addedElements = addElement(
				createElementInForm(fieldName, fieldValue, externalFormID, externalFormID)
			);

			await waitNextTask();

			const formElement = addedElements[0];
			const externalForm = addedElements[1];

			const submitPromise = listenToSubmission(externalForm);

			requestSubmit(externalForm);

			for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
				expect(formDataKey).to.equal(fieldName);
				expect(formDataValue).to.equal(fieldValue);
			}

			expect(formElement.querySelector(`input[name="${fieldName}"`)).to.equal(
				null
			);
			expect(
				externalForm.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should do nothing if form value resolves to a non form element`, async function () {
			const nonExistentFormId = 'noneExistentForm';
			const [formElement] = addElement(
				createElementInForm(fieldName, fieldValue, nonExistentFormId)
			);
			await waitNextTask();

			expect(formElement.querySelector('input')).to.equal(null);
		});

		describe(`value binding`, function () {
			it(`should reset the value of the custom element to default on form reset`, async function () {
				const [formElement] = addElement(
					createElementInForm(fieldName, fieldValue)
				);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();
				actualElement.value = '5';
				await waitNextTask();
				formElement.reset();

				expect(actualElement.value).to.equal(fieldValue);
			});

			it(`should change the value of the mock input on internal input change`, async function () {
				const addedElements = addElement(
					createElementInForm(fieldName, fieldValue)
				);

				const formElement = addedElements[0];
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();

				await changeValueAndNotify(actualElement, fieldValue, 'change');

				expect(getHiddenInput(formElement, fieldName).value).to.equal(fieldValue);
			});
		});

		describe(`validation`, function () {
			const invalidValue = '';
			const validValue = 'abc';
			let formElement, actualElement;

			beforeEach(async function () {
				[formElement] = addElement(createElementInForm(fieldName, validValue));
				actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();
			});

			it(`should set validity on the form`, async function () {
				await changeValueAndNotify(actualElement, invalidValue);
				const invalidity = formElement.checkValidity();

				await changeValueAndNotify(actualElement, validValue, 'input');

				expect(invalidity).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should validate on reset`, async function () {
				validateOnReset(formElement);
			});

			it(`should not submit an invalid form`, async function () {
				let submitted = false;
				formElement.addEventListener('submit', () => {
					submitted = true;
				});

				await changeValueAndNotify(actualElement, invalidValue);
				requestSubmit(formElement);

				expect(formElement.checkValidity()).to.equal(false);
				expect(submitted).to.equal(false);
			});
		});

		it(`should work under multiple shadow layers`, async function () {
			validateMultipleShadowLayers(COMPONENT_NAME, 'input');
		});

		describe(`submit form on Enter key`, function () {
			let actualElement, formElement, externalForm;
			const fieldName = 'test-field';
			const externalFormID = 'externalForm';
			const fieldValue = Math.random().toString();

			function dispatchKeyEvent(keyName) {
				const ke = new KeyboardEvent('keydown', {
					bubbles: true,
					cancelable: true,
					key: keyName,
				});
				actualElement.dispatchEvent(ke);
			}

			beforeEach(async function () {
				[formElement, externalForm] = addElement(
					textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}" form="${externalFormID}">
					</${COMPONENT_NAME}>
				</form>
				<form onsubmit="return false" name="externalForm" id="${externalFormID}"></form>`)
				);
				actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();
			});

			it(`should submit form on enter key press with button without a type`, async function () {
				const submitPromise = listenToSubmission(externalForm);
				externalForm.appendChild(document.createElement('button'));

				dispatchKeyEvent('Enter');

				for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
					expect(formDataKey).to.equal(fieldName);
					expect(formDataValue).to.equal(fieldValue);
				}
			});

			it(`should submit form on enter key press with input of type "submit"`, async function () {
				const submitElement = document.createElement('input');
				submitElement.setAttribute('type', 'submit');
				externalForm.appendChild(submitElement);
				const submitPromise = listenToSubmission(externalForm);

				dispatchKeyEvent('Enter');

				for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
					expect(formDataKey).to.equal(fieldName);
					expect(formDataValue).to.equal(fieldValue);
				}
			});

			it(`should not submit form without a button or input submit`, async function () {
				let called = false;
				externalForm.addEventListener('submit', () => (called = true));

				dispatchKeyEvent('Enter');

				expect(called).to.equal(false);
			});
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
				textToDomToParent(`<${COMPONENT_NAME} outlined></${COMPONENT_NAME}>`)
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
				textToDomToParent(`<${COMPONENT_NAME} outlined></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.shadowRoot.querySelector(
				'.mdc-text-field'
			);

			expect(formElement.getAttribute('shape') === 'rounded').to.equal(true);
			assertComputedStyle(actualElement, borderRadiusStyles(6));

			formElement.dense = true;
			await waitNextTask();
			assertComputedStyle(actualElement, borderRadiusStyles(5));
		});

		it('should have pill shape when shape set to pill', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined shape="pill"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const actualElement = addedElements[0].shadowRoot.querySelector(
				'.mdc-text-field'
			);
			assertComputedStyle(actualElement, borderRadiusStyles(24));
		});
	});
});
