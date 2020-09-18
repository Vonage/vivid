abstract class InputElement {
	name: string | undefined = '';
	value = '';
	getAttribute(str: string): string | null {
		return str;
	}
	closest(str: string): HTMLElement | null {
		console.log(str);
		return null;
	}
	abstract addEventListener(eventName: string, cb: (evt?: Event) => void): void;
	abstract disconnectedCallback(): void;
	abstract appendChild(elm: HTMLElement): void;
}

const types = ['checkbox', 'textarea', 'input'];
export type HiddenInputType = typeof types;

class FormAssociationDisconnectionComponent extends HTMLElement {
	#_listener: () => void = () => {
		return;
	};

	set listener(cb: () => void) {
		this.#_listener = cb;
	}

	get listener(): () => void {
		return this.#_listener;
	}

	disconnectedCallback() {
		this.#_listener();
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

function appendHiddenInput(
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

function setValueAndValidity(
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
		setValueAndValidity(
			hiddenInput,
			inputElement.value,
			internalFormElement.validationMessage
		);
	};
}

function silenceInvalidEvent(inputElement: HTMLInputElement) {
	inputElement.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});
}

function setInputUpdateEvents<T extends InputElement>(
	inputElement: T,
	internalFormElement: HTMLInputElement,
	hiddenInput: HTMLInputElement
) {
	const eventNames = ['input', 'change'];
	eventNames.forEach((eventName) => {
		inputElement.addEventListener(eventName, () => {
			setValueAndValidity(
				hiddenInput,
				inputElement.value,
				internalFormElement.validationMessage
			);
		});
	});
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

	const hiddenInput = appendHiddenInput(hostingForm, inputElement, hiddenType);
	setValueAndValidity(
		hiddenInput,
		inputElement.value,
		internalFormElement.validationMessage
	);

	const resetFormHandler = resetFormFactory(
		inputElement,
		internalFormElement,
		hiddenInput
	);
	hostingForm.addEventListener('reset', resetFormHandler);
	const removeListenerElement = document.createElement(
		'form-association-disconnection'
	) as FormAssociationDisconnectionComponent;
	removeListenerElement.listener = () => {
		hiddenInput.remove();
		hostingForm.removeEventListener('reset', resetFormHandler);
	};
	inputElement.appendChild(removeListenerElement);

	silenceInvalidEvent(hiddenInput);

	setInputUpdateEvents(inputElement, internalFormElement, hiddenInput);
}

export function requestSubmit(form: HTMLFormElement) {
	const fakeButton = document.createElement('button');
	fakeButton.style.display = 'none';
	form.appendChild(fakeButton);
	fakeButton.click();
	fakeButton.remove();
}
