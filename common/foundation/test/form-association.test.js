import { addInputToForm } from '../form-association';
import { textToDomToParent, randomAlpha } from '../../../test/test-helpers';

function setInputElementAttributes(inputElement, attrs = {}, domAttrs = {}) {
	Object.keys(attrs).forEach(attr => {
		inputElement[attr] = attrs[attr];
	});

	Object.keys(domAttrs).forEach(attr => {
		inputElement.setAttribute(attr, domAttrs[attr]);
	});
}

describe.only(`Form Association Foundation`, function() {
	let addedElements = [];

	afterEach(function() {
		addedElements.forEach(elm => elm.remove());
	});

	describe(`addInputToForm`, function() {
		let originalSetCustomValidity;
		beforeEach(function() {
			originalSetCustomValidity = HTMLElement.prototype.setCustomValidity;
			HTMLElement.prototype.setCustomValidity = function() {
				return 5;
			};
		});

		afterEach(() => {
			HTMLElement.prototype.setCustomValidity = originalSetCustomValidity;
		});

		it(`should attach a hidden input to form with given name`, function() {
			const fieldName = 'fieldName';
			const [formElement] = addedElements = textToDomToParent(`<form><div><input></input></div></form>`);
			const inputElementWrapper = formElement.children[0];

			setInputElementAttributes(inputElementWrapper, {
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName
			});

			const numberOfNamedInputsBefore = formElement.querySelectorAll(`input[name="${fieldName}]"`).length;

			addInputToForm(inputElementWrapper);
			expect(numberOfNamedInputsBefore).to.equal(0);
			expect(formElement.querySelectorAll(`input[name="${fieldName}"]`).length).to.equal(1);
		});

		it(`should attach a hidden input to form with given id`, function() {
			const otherFormId = randomAlpha();
			const [formElement, otherForm] = addedElements = textToDomToParent(`
				<form><div><input></input></div></form>
				<form id="${otherFormId}"></form>
			`);

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
					formElement: inputElementWrapper.querySelector('input')
				},
				{
				form: otherFormId,
			});

			addInputToForm(inputElementWrapper);

			expect(formElement.querySelectorAll('input').length).to.equal(1);
			expect(otherForm.querySelectorAll('input').length).to.equal(1);
		});

		it(`should attach to no form if given form id is not found`, function() {
			const otherFormId = randomAlpha();
			const nonExistentFormId = 'someOtherFormId';
			const fieldName = 'fieldName';
			const [formElement] = addedElements = textToDomToParent(`<form><div><input></input></div></form><form id="${otherFormId}"></form>`);

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
					name: fieldName,
					formElement: inputElementWrapper.querySelector('input')
				},
				{
					form: nonExistentFormId,
				});

			addInputToForm(inputElementWrapper);

			expect(document.querySelectorAll(`input[name="${fieldName}"]`).length).to.equal(0);
		});

		it(`should reset value of the internal input, the wrapper and the hidden input on form reset`, function() {
			const otherFormId = randomAlpha();
			const defaultValue = 'defaultValue';
			const fieldName = 'fieldName';

			const [formElement, otherForm] = addedElements = textToDomToParent(`<form><div><input></input></div></form><form id="${otherFormId}"></form>`);

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
					name: fieldName,
					formElement: inputElementWrapper.querySelector('input'),
					value: defaultValue
				},
				{
					form: otherFormId,
				});

			addInputToForm(inputElementWrapper);

			const hiddenInput = document.querySelector(`input[name="${fieldName}"]`);

			otherForm.reset();

			expect(hiddenInput.value).to.equal(defaultValue);
			expect(inputElementWrapper.formElement.value).to.equal(defaultValue);
			expect(inputElementWrapper.value).to.equal(defaultValue);
		});

		it(`should set the validity and value of the hidden input according to the internal input`, function() {

			const otherFormId = randomAlpha();
			const validValue = 'defaultValue';
			const invalidValue = 'defaultValue';
			const fieldName = 'fieldName';

			const [formElement] = addedElements = textToDomToParent(`<form><div required><input required></input></div></form><form id="${otherFormId}"></form>`);

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
				form: otherFormId,
				formElement: inputElementWrapper.querySelector('input'),
				name: fieldName
			});

			addInputToForm(inputElementWrapper);

			const hiddenInput = document.querySelector(`input[name="${fieldName}"]`);

			const values = [validValue, invalidValue];
			const events = ['input', 'change'];

			events.forEach(eventName => {
				const inputEvent = new Event(eventName);
				values.forEach(inputValue => {
					inputElementWrapper.value = inputElementWrapper.formElement.value = inputValue;
					inputElementWrapper.dispatchEvent(inputEvent);
					expect(hiddenInput.value, `${eventName} was unable to match values`).to.equal(inputElementWrapper.formElement.value);
					expect(hiddenInput.validationMessage, `${eventName} was unable to match validation messages`).to.equal(inputElementWrapper.formElement.validationMessage);
				});
			});
		});

		it(`should add custom hidden element`, function() {
			const hiddenElementType = 'DIGGERING';
			const fieldName = 'inputName';

			addedElements = textToDomToParent(`<form><div><input></input></div></form>`);
			const formElement = addedElements[0];

			const inputElementWrapper = formElement.children[0];
			setInputElementAttributes(inputElementWrapper, {
					name: fieldName,
					formElement: inputElementWrapper.querySelector('input'),
				});

			addInputToForm(inputElementWrapper, hiddenElementType);

			expect(formElement.querySelector(`[name="${fieldName}"]`).tagName).to.equal(hiddenElementType);
		});
	});
});