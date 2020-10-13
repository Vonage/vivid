import '../vwc-textarea.js';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
	changeValueAndNotify,
	isolatedElementsCreation,
	listenToSubmission,
} from '../../../test/test-helpers.js';
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
				formElement.querySelectorAll(`textarea[name="${fieldName}"`).length
			).to.equal(1);
			expect(validInput).to.equal(true);
			expect(formElement.checkValidity()).to.equal(false);
		});
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

		it('should have set typography for a floating label', async () => {
			formElement.value = 'hello';
			await waitInterval(200); // font transition
			assertComputedStyle(labelElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '12.642px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '18.4px',
				letterSpacing: '0.119',
				textTransform: 'none',
			});
		});

		it('should have set typography for an input', async () => {
			const inputElement = formElement.shadowRoot.querySelector(
				'.mdc-text-field__input'
			);
			assertComputedStyle(inputElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '24px',
				letterSpacing: '0.133333px',
				textTransform: 'none',
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
				fontSize: '14.2222px',
				left: '-12px',
				top: '-24px',
				transform: 'none',
			});
		});
	});
});
