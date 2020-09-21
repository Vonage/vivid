import { getFormByIdOrClosest, InputElement } from './common';

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

function setInternalValueAndValidityInHiddenInput(
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
		setInternalValueAndValidityInHiddenInput(
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

function syncValueAndValidityOnChanges<T extends InputElement>(
	inputElement: T,
	internalFormElement: HTMLInputElement,
	hiddenInput: HTMLInputElement
) {
	const eventNames = ['input', 'change'];
	eventNames.forEach((eventName) => {
		inputElement.addEventListener(eventName, () => {
			setInternalValueAndValidityInHiddenInput(
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

export function associateWithForm<T extends InputElement>(
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
	suspendInvalidEvent(hiddenInput);

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

	setInternalValueAndValidityInHiddenInput(
		hiddenInput,
		inputElement.value,
		internalFormElement.validationMessage
	);

	hostingForm.addEventListener('reset', resetFormHandler);

	appendDisconnectionCleanupElement(inputElement, cleanupCallback);

	syncValueAndValidityOnChanges(inputElement, internalFormElement, hiddenInput);
}
