abstract class InputElement extends HTMLElement {
	name: string | undefined = '';
	value = '';
}

const types = ['checkbox', 'textarea', 'input'];
export type HiddenInputType = typeof types;

class FormAssociationDisconnectionComponent extends HTMLElement {
	disconnectedCallback() {
		this.dispatchEvent(new Event('disconnected'));
	}
}

window.customElements.define(
	'form-association-disconnection',
	FormAssociationDisconnectionComponent
);

function getFormByIdOrClosest<T extends InputElement>(
	element: T
): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId
		? document.getElementById(formId)
		: element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function appendHiddenInputToHostingForm(
	hostingForm: HTMLFormElement,
	{ name, value }: InputElement,
	hiddenType: HiddenInputType[number]
) {
	const hiddenInput = document.createElement(hiddenType) as HTMLInputElement;
	hiddenInput.style.display = 'none';
	name ? hiddenInput.setAttribute('name', name) : '';
	hiddenInput.defaultValue = value;
	hostingForm.appendChild(hiddenInput);

	return hiddenInput;
}

function syncValueAndValidity(
	inputField: HTMLInputElement | undefined,
	value: string,
	validationMessage = ''
) {
	if (!inputField) {
		return;
	}
	inputField.value = value;
	inputField.setCustomValidity(validationMessage);
}

function resetFormFactory<T extends InputElement>(
	inputElement: T,
	internalFormElement: HTMLInputElement,
	hiddenInput: HTMLInputElement
) {
	return () => {
		inputElement.value = internalFormElement.value =
			hiddenInput?.defaultValue ?? '';
		syncValueAndValidity(
			hiddenInput,
			inputElement.value,
			internalFormElement.validationMessage
		);
	};
}

function suspendInvalidEvent(inputElement: HTMLInputElement) {
	inputElement.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});
}

function setInputSyncEvents<T extends InputElement>(
	inputElement: T,
	internalFormElement: HTMLInputElement,
	hiddenInput: HTMLInputElement
) {
	const eventNames = ['input', 'change'];
	eventNames.forEach((eventName) => {
		inputElement.addEventListener(eventName, () => {
			syncValueAndValidity(
				hiddenInput,
				inputElement.value,
				internalFormElement.validationMessage
			);
		});
	});
}

function appendDisconnectionCleanupElement<T extends InputElement>(
	inputElement: T,
	disconnectionCallback: () => void
) {
	const removeListenerElement = document.createElement(
		'form-association-disconnection'
	) as FormAssociationDisconnectionComponent;
	removeListenerElement.addEventListener('disconnected', () => {
		disconnectionCallback();
	});
	inputElement.appendChild(removeListenerElement);
}

function associateFormCleanupFactory(
	hiddenInput: HTMLInputElement,
	hostingForm: HTMLFormElement,
	resetFormHandler: () => void
) {
	return () => {
		hiddenInput.remove();
		hostingForm.removeEventListener('reset', resetFormHandler);
	};
}

export function addInputToForm<T extends InputElement>(
	inputElement: T,
	internalFormElement: HTMLInputElement,
	hiddenType: HiddenInputType[number] = 'input'
): void {
	const hostingForm = getFormByIdOrClosest(inputElement);

	if (!hostingForm || !inputElement) {
		return;
	}

	const hiddenInput = appendHiddenInputToHostingForm(
		hostingForm,
		inputElement,
		hiddenType
	);

	const resetFormHandler = resetFormFactory(
		inputElement,
		internalFormElement,
		hiddenInput
	);

	const cleanupCallback = associateFormCleanupFactory(
		hiddenInput,
		hostingForm,
		resetFormHandler
	);

	syncValueAndValidity(
		hiddenInput,
		inputElement.value,
		internalFormElement.validationMessage
	);

	hostingForm.addEventListener('reset', resetFormHandler);

	appendDisconnectionCleanupElement(inputElement, cleanupCallback);

	suspendInvalidEvent(hiddenInput);

	setInputSyncEvents(inputElement, internalFormElement, hiddenInput);
}

export function requestSubmit(form: HTMLFormElement): void {
	const fakeButton = document.createElement('button');
	fakeButton.style.display = 'none';
	form.appendChild(fakeButton);
	fakeButton.click();
	fakeButton.remove();
}
