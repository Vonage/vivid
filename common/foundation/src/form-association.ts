interface SetInputUpdateEvent {
	eventName: string;
	inputElement: HTMLInputElement;
	innerInputElement: HTMLInputElement;
	hiddenInput: HTMLInputElement;
}
const types = ['checkbox', 'textarea', 'input'];
export type HiddenInputType = typeof types;

function getFormByIdOrClosest(element: HTMLElement): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId
		? document.getElementById(formId)
		: element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function addHiddenInput(
	hostingForm: HTMLElement,
	customInput: HTMLInputElement,
	hiddenType: HiddenInputType[number]
) {
	const hiddenInput = document.createElement(hiddenType) as HTMLInputElement;
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', customInput.name);
	hiddenInput.defaultValue = customInput.value;
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

function resetFormFactory(
	inputElement: HTMLInputElement,
	innerInputElement: HTMLInputElement,
	hiddenInput: HTMLInputElement
) {
	return () => {
		inputElement.value = innerInputElement.value = hiddenInput.defaultValue ?? '';
		setValueAndValidity(
			hiddenInput,
			inputElement.value,
			innerInputElement.validationMessage
		);
	};
}

function silenceInvalidEvent(inputElement: HTMLInputElement) {
	inputElement.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});
}

function setInputUpdateEvent({
	eventName,
	inputElement,
	innerInputElement,
	hiddenInput,
}: SetInputUpdateEvent) {
	inputElement.addEventListener(eventName, () => {
		setValueAndValidity(
			hiddenInput,
			inputElement.value,
			innerInputElement.validationMessage
		);
	});
}

const cleanupFunctionFactory = (
	hiddenInput: HTMLInputElement,
	hostingForm: HTMLFormElement,
	resetFormHandler: any
) => {
	return () => {
		hiddenInput.remove();
		hostingForm?.removeEventListener('reset', resetFormHandler);
	};
};

function noop() {
	return;
}

export function addInputToForm(
	inputElement: HTMLInputElement,
	innerInputElement: HTMLInputElement,
	hiddenType: HiddenInputType[number] = 'input'
): () => void {
	function setFormResetEvent(hostingForm: HTMLFormElement) {
		const resetFormHandler = resetFormFactory(
			inputElement,
			innerInputElement,
			hiddenInput
		);
		hostingForm.addEventListener('reset', resetFormHandler);
		return resetFormHandler;
	}

	const hostingForm = getFormByIdOrClosest(inputElement);
	if (!hostingForm || !inputElement) {
		return noop;
	}

	const hiddenInput = addHiddenInput(hostingForm, inputElement, hiddenType);

	setValueAndValidity(
		hiddenInput,
		inputElement.value,
		innerInputElement.validationMessage
	);

	const resetFormHandler = setFormResetEvent(hostingForm);

	silenceInvalidEvent(hiddenInput);

	setInputUpdateEvent({
		eventName: 'change',
		inputElement,
		innerInputElement,
		hiddenInput,
	});

	setInputUpdateEvent({
		eventName: 'input',
		inputElement,
		innerInputElement,
		hiddenInput,
	});

	return cleanupFunctionFactory(hiddenInput, hostingForm, resetFormHandler);
}
