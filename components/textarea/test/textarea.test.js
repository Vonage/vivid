import '../vwc-textarea.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	changeValueAndNotify,
	isolatedElementsCreation,
	listenToSubmission,
} from '../../../test/test-helpers.js';
import {
	typographyTestCases,
	hasNotchedOutline,
	validateMultipleShadowLayers,
} from '../../textfield/test/textfield-utils.test';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textarea';

function getHiddenInput(formElement, fieldName) {
	return formElement.querySelector(`[name="${fieldName}"]`);
}

describe('textarea', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-textarea element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`form association`, function () {
		function createElementInForm(fieldName, fieldValue, formId, otherFormId) {
			const otherForm = otherFormId
				? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
				: '';
			return addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm">
									<${COMPONENT_NAME} name="${fieldName}"
																		 value="${fieldValue}"
																		 ${formId ? `form="${formId}"` : ''}>

									</${COMPONENT_NAME}>
									<button></button>
								</form>
								${otherForm}`
				)
			);
		}

		const fieldValue = `
				${Math.random().toString()}
				${Math.random().toString()}
			`;
		const fieldName = 'test-field';

		it(`should attach to closest form`, async function () {
			const [formElement] = createElementInForm(fieldName, fieldValue);
			const submitPromise = listenToSubmission(formElement);
			await waitNextTask();
			requestSubmit(formElement);

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1].split('\r').join('')).to.equal(fieldValue);
			}

			expect(
				formElement.querySelectorAll(`textarea[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const externalFormID = 'externalForm';
			const [formElement, externalForm] = createElementInForm(
				fieldName,
				fieldValue,
				externalFormID,
				externalFormID
			);

			await waitNextTask();

			const submitPromise = listenToSubmission(externalForm);

			requestSubmit(externalForm);

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1].split('\r').join('')).to.equal(fieldValue);
			}

			expect(formElement.querySelector(`textarea[name="${fieldName}"`)).to.equal(
				null
			);
			expect(
				externalForm.querySelectorAll(`textarea[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should do nothing if form value resolves to a non form element`, async function () {
			const noneExistentFormId = 'noneExistentFormId';
			const [formElement] = createElementInForm(
				fieldName,
				fieldValue,
				noneExistentFormId
			);

			await waitNextTask();

			expect(formElement.querySelector('textarea')).to.equal(null);
		});

		describe(`value binding`, function () {
			it(`should reset the value of the custom element to default on form reset`, async function () {
				const [formElement] = createElementInForm(fieldName, fieldValue);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();
				actualElement.value = '5';
				await waitNextTask();
				formElement.reset();

				expect(actualElement.value).to.equal(fieldValue);
			});

			it(`should change the value of the mock input on internal input change`, async function () {
				const [formElement] = createElementInForm(fieldName, fieldValue);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();

				await changeValueAndNotify(actualElement, fieldValue, 'change');

				expect(getHiddenInput(formElement, fieldName).value).to.equal(fieldValue);
			});
		});

		describe(`validation`, function () {
			const validValue = 'abc';
			const invalidValue = '';

			it(`should get validity from the element's validationMessage`, async function () {
				const [formElement] = createElementInForm(fieldName, invalidValue);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();

				const invalidity = formElement.checkValidity();

				await changeValueAndNotify(actualElement, validValue, 'input');

				expect(invalidity).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should validate on reset`, async function () {
				const [formElement] = createElementInForm(fieldName, validValue);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();

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
				const [formElement] = createElementInForm(fieldName, validValue);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();

				const invalidity = formElement.checkValidity();

				formElement.addEventListener('submit', () => {
					submitted = true;
				});

				requestSubmit(formElement);

				const submitValidForm = submitted;

				submitted = false;

				await changeValueAndNotify(actualElement, invalidValue, 'change');
				requestSubmit(formElement);

				expect(invalidity).to.equal(true);
				expect(submitValidForm).to.equal(true);
				expect(submitted).to.equal(false);
			});
		});

		it(`should work under multiple shadow layers`, async function () {
			validateMultipleShadowLayers(COMPONENT_NAME, 'textarea');
		});
	});

	describe('typography', () => {
		typographyTestCases(COMPONENT_NAME);
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
			const actualElement = addedElements[0].shadowRoot.querySelector(
				'.mdc-text-field--textarea'
			);
			assertComputedStyle(actualElement, { minHeight: '48px' });
		});

		it('should have dense size when dense', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} outlined dense label="VWC Textarea"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.shadowRoot.querySelector(
				'.mdc-text-field--textarea'
			);
			const labelElement = formElement.shadowRoot
				.querySelector('.mdc-notched-outline')
				.querySelector('#label');

			assertComputedStyle(formElement, { paddingTop: '24px' });
			assertComputedStyle(actualElement, { minHeight: '40px' });
			assertComputedStyle(labelElement, {
				fontSize: '14.222px',
				left: '-12px',
				top: '-24px',
				transform: 'none',
			});
		});
	});
});
