import '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

function listenToSubmission(formElement) {
	return new Promise((res) => {
		formElement.addEventListener('submit', () => {
			const formData = new FormData(formElement);
			res(formData);
		});
	});
}

function getHiddenInput(formElement, fieldName) {
	return formElement.querySelector(`input[name="${fieldName}"]`);
}

async function changeFieldValue(actualElement, value, eventName = 'change') {
	actualElement.value = value;
	await waitNextTask();

	let evt = new Event(eventName);
	actualElement.dispatchEvent(evt);
}

describe('textfield', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should be defined as a custom element', async () => {
		expect(Boolean(customElements.get(COMPONENT_NAME))).to.equal(true);
	});

	it('should have internal contents', async () => {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', () => {
		it('should have set typography for a label', async () => {
			addedElements = textToDomToParent(
				`<${COMPONENT_NAME} outlined label="Vwc textarea"></${COMPONENT_NAME}>`
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
			addedElements = textToDomToParent(
				`<${COMPONENT_NAME} outlined disabled label="Vwc textarea"></${COMPONENT_NAME}>`
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
		it(`should attach to closest form`, async function () {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			addedElements = textToDomToParent(
				`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}">Button Text</${COMPONENT_NAME}></form>`
			);
			const formElement = addedElements[0];
			await waitNextTask();

			const submitPromise = listenToSubmission(formElement);

			formElement.requestSubmit();

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(fieldValue);
			}

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			const externalFormID = 'externalForm';

			addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}" form="${externalFormID}">Button Text
					</${COMPONENT_NAME}>
				</form>
				<form onsubmit="return false" name="externalForm" id="${externalFormID}"></form>`);

			await waitNextTask();

			const formElement = addedElements[0];
			const externalForm = addedElements[1];

			const submitPromise = listenToSubmission(externalForm);

			externalForm.requestSubmit();

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(fieldValue);
			}

			expect(formElement.querySelector(`input[name="${fieldName}"`)).to.equal(
				null
			);
			expect(
				externalForm.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
		});

		it(`should do nothing if form value resolves to a non form element`, async function () {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			const formId = 'testForm';
			addedElements = textToDomToParent(
				`<div onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}" form="${formId}">Button Text</${COMPONENT_NAME}></div>`
			);
			const formElement = addedElements[0];
			await waitNextTask();

			expect(formElement.querySelector('input')).to.equal(null);
		});

		describe(`value binding`, function () {
			it(`should reset the value of the custom element to default on form reset`, async function () {
				const fieldValue = Math.random().toString();
				const fieldName = 'test-field';
				addedElements = textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}">Button Text</${COMPONENT_NAME}></form>`
				);
				const formElement = addedElements[0];
				const actualElement = formElement.firstChild;
				await waitNextTask();
				actualElement.value = '5';
				await waitNextTask();
				formElement.reset();

				expect(actualElement.value).to.equal(fieldValue);
			});

			it(`should change the value of the mock input on internal input change`, async function () {
				const fieldValue = Math.random().toString();
				const fieldName = 'test-field';
				addedElements = textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} name="${fieldName}">Button Text</${COMPONENT_NAME}></form>`
				);
				const formElement = addedElements[0];
				const actualElement = formElement.firstChild;
				await waitNextTask();

				await changeFieldValue(actualElement, fieldValue, 'change');

				expect(getHiddenInput(formElement, fieldName).value).to.equal(fieldValue);
			});
		});

		describe(`validation`, function () {
			it(`should get validity from the element's validationMessage`, async function () {
				const fieldName = 'test-field';
				addedElements = textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} required name="${fieldName}">Button Text</${COMPONENT_NAME}></form>`
				);
				const formElement = addedElements[0];
				const actualElement = formElement.firstChild;
				await waitNextTask();

				const invalidity = formElement.checkValidity();

				await changeFieldValue(actualElement, 'abc', 'input');

				expect(invalidity).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should validate on reset`, async function () {
				const fieldValue = Math.random().toString();
				const fieldName = 'test-field';
				addedElements = textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} required value="${fieldValue}" name="${fieldName}">Button Text</${COMPONENT_NAME}></form>`
				);
				const formElement = addedElements[0];
				const actualElement = formElement.firstChild;
				await waitNextTask();

				const validInput = formElement.checkValidity();
				await changeFieldValue(actualElement, '', 'change');
				const invalidInput = formElement.checkValidity();

				formElement.reset();

				expect(validInput).to.equal(true);
				expect(invalidInput).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should not submit an invalid form`, async function () {
				let submitted = false;
				const fieldName = 'test-field';
				addedElements = textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} required value="val" name="${fieldName}">Button Text</${COMPONENT_NAME}></form>`
				);
				const formElement = addedElements[0];
				const actualElement = formElement.firstChild;
				await waitNextTask();

				const invalidity = formElement.checkValidity();

				await waitNextTask();

				formElement.addEventListener('submit', () => {
					submitted = true;
				});

				formElement.requestSubmit();

				const submitValidForm = submitted;

				submitted = false;

				await changeFieldValue(actualElement, '', 'change');
				formElement.requestSubmit();

				expect(invalidity).to.equal(true);
				expect(submitValidForm).to.equal(true);
				expect(submitted).to.equal(false);
			});
		});

		it(`should work under multiple shadow layers`, async function () {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<vwc-formfield>
						<${COMPONENT_NAME} required value="${fieldValue}" name="${fieldName}">Button Text</${COMPONENT_NAME}>
					</vwc-formfield>
				</form>`);
			const formElement = addedElements[0];
			const actualElement = formElement.children[0].children[0];
			await waitNextTask();

			const validInput = formElement.checkValidity();

			const submitPromise = listenToSubmission(formElement);

			formElement.requestSubmit();

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(fieldValue);
			}

			await changeFieldValue(actualElement, '', 'change');

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"`).length
			).to.equal(1);
			expect(validInput).to.equal(true);
			expect(formElement.checkValidity()).to.equal(false);
		});
	});

	describe('notched outlined', () => {
		it('should have vwc-notched-outline defined', async () => {
			addedElements = textToDomToParent(
				`<${COMPONENT_NAME} outlined></${COMPONENT_NAME}>`
			);
			await waitNextTask();
			const notchedOutline = addedElements[0].shadowRoot.querySelector(
				'vwc-notched-outline'
			);
			expect(notchedOutline).to.exist;
		});
	});
});
