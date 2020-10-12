import '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	changeValueAndNotify,
	isolatedElementsCreation,
	randomAlpha,
	listenToSubmission,
} from '../../../test/test-helpers.js';
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
		it('should have set typography for a label', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined label="Vwc textarea"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const labelElement = addedElements[0].shadowRoot
				.querySelector('.mdc-notched-outline')
				.querySelector('#label');
			expect(labelElement).to.exist;
			assertComputedStyle(labelElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '16px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '18.4px',
				letterSpacing: '0.15px',
				textTransform: 'none',
			});
		});

		it('should have set typography for an input', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined disabled label="Vwc textarea"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const inputElement = addedElements[0].shadowRoot.querySelector(
				'.mdc-text-field__input'
			);
			expect(inputElement).to.exist;
			assertComputedStyle(inputElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: 'normal',
				letterSpacing: '0.133333px',
				textTransform: 'none',
			});
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
				const validInput = formElement.checkValidity();
				await changeValueAndNotify(actualElement, invalidValue, 'change');
				const invalidInput = formElement.checkValidity();

				formElement.reset();

				expect(validInput).to.equal(true);
				expect(invalidInput).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
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
			const actualElement = wrapperElement.shadowRoot.querySelector(
				COMPONENT_NAME
			);

			const validInput = formElement.checkValidity();
			const submitPromise = listenToSubmission(formElement);

			requestSubmit(formElement);

			for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
				expect(formDataKey).to.equal(fieldName);
				expect(formDataValue).to.equal(fieldValue);
			}

			await changeValueAndNotify(actualElement, '', 'change');

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
			expect(validInput).to.equal(true);
			expect(formElement.checkValidity()).to.equal(false);
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
			const addedElements = addElement(
				textToDomToParent(`<${COMPONENT_NAME} outlined></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const notchedOutline = addedElements[0].shadowRoot.querySelector(
				'vwc-notched-outline'
			);
			expect(notchedOutline).to.exist;
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
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined dense label="VWC Textfield"></${COMPONENT_NAME}>`
				)
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
			const expectedNormalStyles = {
				borderTopLeftRadius: '6px',
				borderTopRightRadius: '6px',
				borderBottomLeftRadius: '6px',
				borderBottomRightRadius: '6px',
			};
			assertComputedStyle(actualElement, expectedNormalStyles);

			formElement.dense = true;
			await waitNextTask();
			const expectedDenseStyles = {
				borderTopLeftRadius: '5px',
				borderTopRightRadius: '5px',
				borderBottomLeftRadius: '5px',
				borderBottomRightRadius: '5px',
			};
			assertComputedStyle(actualElement, expectedDenseStyles);
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
			const expectedStyles = {
				borderTopLeftRadius: '24px',
				borderTopRightRadius: '24px',
				borderBottomLeftRadius: '24px',
				borderBottomRightRadius: '24px',
			};
			assertComputedStyle(actualElement, expectedStyles);
		});
	});
});
