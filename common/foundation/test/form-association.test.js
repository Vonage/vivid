import {
	addInputToForm,
	requestSubmit,
	submitOnKeys,
} from '../form-association';
import { textToDomToParent, randomAlpha } from '../../../test/test-helpers';

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
			addedElements = textToDomToParent(`<form><div><input></input></div></form>`);
			const formElement = addedElements[0];
			const inputElementWrapper = formElement.children[0];
			inputElementWrapper.name = fieldName;
			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');

			const numberOfNamedInputsBefore = formElement.querySelectorAll(
				`input[name="${fieldName}]"`
			).length;

			addInputToForm(inputElementWrapper);
			expect(numberOfNamedInputsBefore).to.equal(0);
			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"]`).length
			).to.equal(1);
		});

		it(`should attach a hidden input to form with given id`, function () {
			const otherFormId = randomAlpha();
			addedElements = textToDomToParent(`
				<form><div><input></input></div></form>
				<form id="${otherFormId}"></form>
			`);
			const formElement = addedElements[0];
			const otherForm = addedElements[1];

			const inputElementWrapper = formElement.children[0];
			inputElementWrapper.setAttribute('form', otherFormId);
			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');

			addInputToForm(inputElementWrapper);

			expect(formElement.querySelectorAll('input').length).to.equal(1);
			expect(otherForm.querySelectorAll('input').length).to.equal(1);
		});

		it(`should attach to no form if given form id is not found`, function () {
			const otherFormId = randomAlpha();
			const fieldName = 'fieldName';
			addedElements = textToDomToParent(
				`<form><div><input></input></div></form><form id="${otherFormId}"></form>`
			);
			const formElement = addedElements[0];
			const inputElementWrapper = formElement.children[0];
			inputElementWrapper.setAttribute('form', 'someOtherFormId');
			inputElementWrapper.name = fieldName;

			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');

			addInputToForm(inputElementWrapper);

			expect(
				document.querySelectorAll(`input[name="${fieldName}"]`).length
			).to.equal(0);
		});

		it(`should reset value of the internal input, the wrapper and the hidden input on form reset`, function () {
			const otherFormId = randomAlpha();
			const defaultValue = 'defaultValue';
			const fieldName = 'fieldName';

			addedElements = textToDomToParent(
				`<form><div><input></input></div></form><form id="${otherFormId}"></form>`
			);
			const formElement = addedElements[0];
			const otherForm = addedElements[1];

			const inputElementWrapper = formElement.children[0];
			inputElementWrapper.setAttribute('form', otherFormId);
			inputElementWrapper.value = defaultValue;
			inputElementWrapper.name = fieldName;
			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');

			addInputToForm(inputElementWrapper);

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

			addedElements = textToDomToParent(
				`<form><div required><input required></input></div></form><form id="${otherFormId}"></form>`
			);
			const formElement = addedElements[0];

			const inputElementWrapper = formElement.children[0];
			inputElementWrapper.form = otherFormId;
			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');
			inputElementWrapper.name = fieldName;

			addInputToForm(inputElementWrapper);

			const hiddenInput = document.querySelector(`input[name="${fieldName}"]`);

			const values = [validValue, invalidValue];
			const events = ['input', 'change'];

			events.forEach((eventName) => {
				const inputEvent = new Event(eventName);
				values.forEach((inputValue) => {
					inputElementWrapper.value = inputElementWrapper.formElement.value = inputValue;
					inputElementWrapper.dispatchEvent(inputEvent);
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
			inputElementWrapper.formElement = inputElementWrapper.querySelector('input');
			inputElementWrapper.name = fieldName;

			addInputToForm(inputElementWrapper, hiddenElementType);

			expect(formElement.querySelector(`[name="${fieldName}"]`).tagName).to.equal(
				hiddenElementType
			);
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

	describe(`submitOnKeys`, function () {
		let formSubmitted = false;
		let textAreaElement;
		const keyName = 'Enter';

		function setupTest() {
			addedElements = textToDomToParent(
				`<form onsubmit="return false"><textarea></textarea></form>`
			);
			const formElement = addedElements[0];
			textAreaElement = formElement.querySelector('textarea');

			formElement.addEventListener('submit', () => (formSubmitted = true));

			submitOnKeys(textAreaElement, [keyName]);
			const ke = new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: keyName,
			});
			textAreaElement.dispatchEvent(ke);
		}

		beforeEach(function () {
			setupTest();
		});

		it(`should submit the form when hitting designated keys`, function () {
			expect(formSubmitted).to.equal(true);
		});

		it(`should remove listeners that were set if called again without them`, function () {
			const formerFormSubmitted = formSubmitted;
			formSubmitted = false;
			let removeListenerEvent = '';

			textAreaElement.removeEventListener = function (eventName) {
				removeListenerEvent = eventName;
			};

			submitOnKeys(textAreaElement, []);
			const ke = new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: keyName,
			});
			textAreaElement.dispatchEvent(ke);

			expect(removeListenerEvent).to.equal('keydown');
			expect(formSubmitted).to.equal(false);
		});

		it(`should remove added attributes to the element`, function () {
			submitOnKeys(textAreaElement, ['Enter'], 'formId');
			submitOnKeys(textAreaElement, []);
			const keysAttrAfter = textAreaElement.getAttribute('data-keys');
			const formAttrAfter = textAreaElement.getAttribute('data-form');

			expect(keysAttrAfter).to.equal(null);
			expect(formAttrAfter).to.equal(null);
		});
	});
});
