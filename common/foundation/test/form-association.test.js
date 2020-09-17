import { addInputToForm, requestSubmit } from '../form-association';
import {
	textToDomToParent,
	randomAlpha,
	waitNextTask,
} from '../../../test/test-helpers';

function setInputElementAttributes(inputElement, attrs = {}, domAttrs = {}) {
	Object.keys(attrs).forEach((attr) => {
		inputElement[attr] = attrs[attr];
	});

	Object.keys(domAttrs).forEach((attr) => {
		inputElement.setAttribute(attr, domAttrs[attr]);
	});
}

async function changeFieldValue(actualElement, value, eventName = 'change') {
	actualElement.value = value.toString();
	await waitNextTask();

	let evt = new Event(eventName);
	actualElement.dispatchEvent(evt);
}

describe(`Form Association Foundation`, function () {
	let addedElements = [];

	afterEach(function () {
		addedElements.forEach((elm) => elm.remove());
	});

	describe(`addInputToForm`, function () {
		let originalSetCustomValidity;
		beforeEach(function () {
			originalSetCustomValidity = HTMLElement.prototype.setCustomValidity;
			HTMLElement.prototype.setCustomValidity = function () {
				return 5;
			};
		});

		afterEach(() => {
			HTMLElement.prototype.setCustomValidity = originalSetCustomValidity;
		});

		it(`should attach a hidden input to form with given name`, function () {
			const fieldName = 'fieldName';
			const [formElement] = (addedElements = textToDomToParent(
				`<form><div><input></input></div></form>`
			));
			const inputElementWrapper = formElement.children[0];

			setInputElementAttributes(inputElementWrapper, {
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName,
			});

			const numberOfNamedInputsBefore = formElement.querySelectorAll(
				`input[name="${fieldName}]"`
			).length;

			addInputToForm(inputElementWrapper, inputElementWrapper.formElement);
			expect(numberOfNamedInputsBefore).to.equal(0);
			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"]`).length
			).to.equal(1);
		});

		it(`should attach a hidden input to form with given id`, function () {
			const otherFormId = randomAlpha();
			const [formElement, otherForm] = (addedElements = textToDomToParent(`
				<form><div><input></input></div></form>
				<form id="${otherFormId}"></form>
			`));

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(
				inputElementWrapper,
				{
					formElement: inputElementWrapper.querySelector('input'),
				},
				{
					form: otherFormId,
				}
			);

			addInputToForm(inputElementWrapper, inputElementWrapper.formElement);

			expect(formElement.querySelectorAll('input').length).to.equal(1);
			expect(otherForm.querySelectorAll('input').length).to.equal(1);
		});

		it(`should attach to no form if given form id is not found`, function () {
			const otherFormId = randomAlpha();
			const nonExistentFormId = 'someOtherFormId';
			const fieldName = 'fieldName';
			const [formElement] = (addedElements = textToDomToParent(
				`<form><div><input></input></div></form><form id="${otherFormId}"></form>`
			));

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(
				inputElementWrapper,
				{
					name: fieldName,
					formElement: inputElementWrapper.querySelector('input'),
				},
				{
					form: nonExistentFormId,
				}
			);

			addInputToForm(inputElementWrapper, inputElementWrapper.formElement);

			expect(
				document.querySelectorAll(`input[name="${fieldName}"]`).length
			).to.equal(0);
		});

		it(`should reset value of the internal input, the wrapper and the hidden input on form reset`, function () {
			const otherFormId = randomAlpha();
			const defaultValue = 'defaultValue';
			const fieldName = 'fieldName';

			const [formElement, otherForm] = (addedElements = textToDomToParent(
				`<form><div><input></input></div></form><form id="${otherFormId}"></form>`
			));

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(
				inputElementWrapper,
				{
					name: fieldName,
					formElement: inputElementWrapper.querySelector('input'),
					value: defaultValue,
				},
				{
					form: otherFormId,
				}
			);

			addInputToForm(inputElementWrapper, inputElementWrapper.formElement);

			const hiddenInput = document.querySelector(`input[name="${fieldName}"]`);

			otherForm.reset();

			expect(hiddenInput.value).to.equal(defaultValue);
			expect(inputElementWrapper.formElement.value).to.equal(defaultValue);
			expect(inputElementWrapper.value).to.equal(defaultValue);
		});

		it(`should set the validity and value of the hidden input according to the internal input`, function () {
			const otherFormId = randomAlpha();
			const validValue = 'defaultValue';
			const invalidValue = 'defaultValue';
			const fieldName = 'fieldName';

			const [formElement] = (addedElements = textToDomToParent(
				`<form><div required><input required></input></div></form><form id="${otherFormId}"></form>`
			));

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
				form: otherFormId,
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName,
			});

			addInputToForm(inputElementWrapper, inputElementWrapper.formElement);

			const hiddenInput = document.querySelector(`input[name="${fieldName}"]`);

			const values = [validValue, invalidValue];
			const events = ['input', 'change'];

			events.forEach((eventName) => {
				values.forEach((inputValue) => {
					inputElementWrapper.value = inputElementWrapper.formElement.value = inputValue;
					inputElementWrapper.dispatchEvent(new Event(eventName));
					expect(
						hiddenInput.value,
						`${eventName} was unable to match values`
					).to.equal(inputElementWrapper.formElement.value);
					expect(
						hiddenInput.validationMessage,
						`${eventName} was unable to match validation messages`
					).to.equal(inputElementWrapper.formElement.validationMessage);
				});
			});
		});

		it(`should add custom hidden element`, function () {
			const hiddenElementType = 'DIGGERING';
			const fieldName = 'inputName';

			addedElements = textToDomToParent(`<form><div><input></input></div></form>`);
			const formElement = addedElements[0];

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
				name: fieldName,
				formElement: inputElementWrapper.querySelector('input'),
			});

			addInputToForm(
				inputElementWrapper,
				inputElementWrapper.formElement,
				hiddenElementType
			);

			expect(formElement.querySelector(`[name="${fieldName}"]`).tagName).to.equal(
				hiddenElementType
			);
		});

		describe(`cleanup`, function () {
			function getHiddenInput(fieldName) {
				return document.querySelector(`input[name="${fieldName}"]`);
			}

			let inputElementWrapper,
				hiddenInput,
				fieldName,
				formElement,
				defaultValue,
				cleanupFunction;

			beforeEach(function () {
				fieldName = 'fieldName';
				defaultValue = 'abc';

				formElement = addedElements = textToDomToParent(
					`<form><div value="${defaultValue}"><input></input></div></form>`
				)[0];

				inputElementWrapper = formElement.children[0];
				setInputElementAttributes(inputElementWrapper, {
					formElement: inputElementWrapper.querySelector('input'),
					name: fieldName,
					value: defaultValue,
				});

				cleanupFunction = addInputToForm(
					inputElementWrapper,
					inputElementWrapper.formElement
				);

				hiddenInput = getHiddenInput(fieldName);
			});

			it(`should remove hidden input on removal from the DOM`, async function () {
				cleanupFunction();
				expect(hiddenInput !== null).to.equal(true);
				expect(getHiddenInput(fieldName)).to.equal(null);
			});

			it(`should remove external event listeners on removal from DOM`, async function () {
				const inputElementValue = '5';

				await changeFieldValue(inputElementWrapper, inputElementValue, 'change');
				const inputAfterFirstChange = hiddenInput.value;

				formElement.reset();
				const inputAfterBoundReset = hiddenInput.value;

				await changeFieldValue(inputElementWrapper, inputElementValue, 'change');
				const inputAfterSecondChange = hiddenInput.value;

				cleanupFunction();

				formElement.reset();
				const inputAfterUnBoundReset = hiddenInput.value;

				expect(inputAfterFirstChange).to.equal(inputElementValue);
				expect(inputAfterBoundReset, 'Reset is not bound!').to.equal(defaultValue);
				expect(inputAfterSecondChange).to.equal(inputElementValue);
				expect(inputAfterUnBoundReset, 'Reset is still bound!').to.equal(
					inputElementValue
				);
			});
		});
	});

	describe(`requestSubmit`, function () {
		it(`should submit a form on requestSubmit when given a form`, function () {
			let formSubmitted = false;

			addedElements = textToDomToParent(`<form onsubmit="return false"></form>`);
			const formElement = addedElements[0];
			formElement.addEventListener('submit', () => (formSubmitted = true));
			formElement.requestSubmit = undefined;

			requestSubmit(formElement);

			expect(formSubmitted).to.equal(true);
		});
	});
});
