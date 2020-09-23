import {
	associateWithForm,
	requestSubmit,
	submitOnEnter,
} from '../form-association';
import {
	textToDomToParent,
	randomAlpha,
	waitNextTask,
} from '../../../test/test-helpers';

function setInputElementAttributes(inputElement, attrs = {}) {
	Object.keys(attrs).forEach((attr) => {
		inputElement.setAttribute(attr, attrs[attr]);
	});
}

function setInputElementProperties(inputElement, props = {}) {
	Object.keys(props).forEach((attr) => {
		inputElement[attr] = props[attr];
	});
}

class TestComponent extends HTMLElement {}

window.customElements.define('test-component', TestComponent);

describe(`Form Association Foundation`, function () {
	let addedElements = [];

	afterEach(function () {
		addedElements.forEach((elm) => elm.remove());
	});

	describe(`associateWithForm`, function () {
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

			setInputElementProperties(inputElementWrapper, {
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName,
			});

			const numberOfNamedInputsBefore = formElement.querySelectorAll(
				`input[name="${fieldName}]"`
			).length;

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);
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
			setInputElementProperties(inputElementWrapper, {
				formElement: inputElementWrapper.querySelector('input'),
			});
			setInputElementAttributes(inputElementWrapper, {
				form: otherFormId,
			});

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

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
			setInputElementProperties(inputElementWrapper, {
				name: fieldName,
				formElement: inputElementWrapper.querySelector('input'),
			});
			setInputElementAttributes(inputElementWrapper, {
				form: nonExistentFormId,
			});

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

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
			setInputElementAttributes(inputElementWrapper, {
				form: otherFormId,
			});

			setInputElementProperties(inputElementWrapper, {
				name: fieldName,
				formElement: inputElementWrapper.querySelector('input'),
				value: defaultValue,
			});

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

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
			setInputElementProperties(inputElementWrapper, {
				form: otherFormId,
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName,
			});

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

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

		it(`should add hidden element according to internalFormElement type`, function () {
			const hiddenElementType = 'DIGGERING';
			const fieldName = 'inputName';

			addedElements = textToDomToParent(
				`<form><div><${hiddenElementType}></${hiddenElementType}></div></form>`
			);
			const formElement = addedElements[0];

			const inputElementWrapper = formElement.children[0];
			setInputElementProperties(inputElementWrapper, {
				name: fieldName,
				formElement: inputElementWrapper.querySelector(hiddenElementType),
			});

			associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

			expect(formElement.querySelector(`[name="${fieldName}"]`).tagName).to.equal(
				hiddenElementType
			);
		});

		describe(`cleanup`, function () {
			function getHiddenInput(fieldName) {
				return document.querySelector(`input[name="${fieldName}"]`);
			}

			let inputElementWrapper, hiddenInput, fieldName, formElement, defaultValue;

			beforeEach(function () {
				fieldName = 'fieldName';
				defaultValue = 'abc';

				formElement = addedElements = textToDomToParent(
					`<form><test-component value="${defaultValue}"><input></input></test-component></form>`
				)[0];

				inputElementWrapper = formElement.children[0];
				setInputElementProperties(inputElementWrapper, {
					formElement: inputElementWrapper.querySelector('input'),
					name: fieldName,
					value: defaultValue,
				});

				associateWithForm(inputElementWrapper, inputElementWrapper.formElement);

				hiddenInput = getHiddenInput(fieldName);
			});

			it(`should remove hidden input on removal from the DOM`, async function () {
				inputElementWrapper.remove();
				await waitNextTask();
				expect(hiddenInput !== null).to.equal(true);
				expect(getHiddenInput(fieldName)).to.equal(null);
			});

			it(`should remove external event listeners on removal from DOM`, async function () {
				const inputElementValue = '5';

				inputElementWrapper.value = inputElementWrapper.formElement.value = inputElementValue;
				inputElementWrapper.dispatchEvent(new Event('change'));
				expect(hiddenInput.value).to.equal(inputElementValue);

				formElement.reset();
				expect(hiddenInput.value).to.equal(defaultValue);

				inputElementWrapper.value = inputElementWrapper.formElement.value = inputElementValue;
				inputElementWrapper.dispatchEvent(new Event('change'));
				expect(hiddenInput.value).to.equal(inputElementValue);

				inputElementWrapper.remove();
				await waitNextTask();
				formElement.reset();

				expect(hiddenInput.value).to.equal(inputElementValue);
			});
		});
	});

	describe(`requestSubmit`, function () {
		it(`should submit a form on requestSubmit when given a form with a submit button`, function () {
			let formSubmitted = false;

			addedElements = textToDomToParent(
				`<form onsubmit="return false"><button>Submit</button></form>`
			);
			const formElement = addedElements[0];
			formElement.addEventListener('submit', () => (formSubmitted = true));
			formElement.requestSubmit = undefined;

			requestSubmit(formElement);

			expect(formSubmitted).to.equal(true);
		});
	});

	describe(`submitOnEnter`, function () {
		function dispatchKeyEvent(keyName) {
			const ke = new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: keyName,
			});
			textAreaElement.dispatchEvent(ke);
		}

		let formSubmitted = 0;
		let textAreaElement;
		const keyName = 'Enter';

		function setupTest() {
			formSubmitted = 0;
			addedElements = textToDomToParent(
				`<form onsubmit="return false"><textarea></textarea><button>Submit</button></form>`
			);
			const formElement = addedElements[0];
			textAreaElement = formElement.querySelector('textarea');

			formElement.addEventListener('submit', () => formSubmitted++);

			submitOnEnter(textAreaElement);
		}

		beforeEach(function () {
			setupTest();
		});

		it(`should submit the form when hitting the "Enter" key`, function () {
			dispatchKeyEvent(keyName);
			dispatchKeyEvent(keyName);
			expect(formSubmitted).to.equal(2);
		});

		it(`should not fire submit when hitting a non "Enter" key`, function () {
			const nonDesignatedKey = 'e';
			dispatchKeyEvent(nonDesignatedKey);
			expect(formSubmitted).to.equal(0);
		});

		it(`should bind to external form according to form attribute`, function () {
			const otherFormId = randomAlpha();
			const otherFormElement = textToDomToParent(
				`<form onsubmit="return false" id="${otherFormId}"><button>Submit</button></form>`
			)[0];
			addedElements.push(otherFormElement);

			let otherFormSubmitted = 0;
			textAreaElement.setAttribute('form', otherFormId);

			otherFormElement.addEventListener('submit', () => otherFormSubmitted++);

			dispatchKeyEvent(keyName);
			expect(otherFormSubmitted).to.equal(1);
		});
	});
});
