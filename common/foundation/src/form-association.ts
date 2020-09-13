const types = ['checkbox', 'textarea', 'input'];
export type HiddenInputType = typeof types;

function getFormByIdOrClosest(element: HTMLElement): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId ? document.getElementById(formId) : element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function addHiddenInput(hostingForm: HTMLFormElement, customInput: HTMLInputElement, hiddenType: HiddenInputType[number]) {
	const hiddenInput = document.createElement(hiddenType) as HTMLInputElement;
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', customInput.name);
	hiddenInput.defaultValue = customInput.value;
	hostingForm.appendChild(hiddenInput);
	return hiddenInput;
}

function setValueAndValidity(inputField: HTMLInputElement | undefined, value: string, validationMessage = '') {
	if (!inputField) {
		return;
	}
	inputField.value = value;
	inputField.setCustomValidity(validationMessage);
}

export function addInputToForm(inputElement: HTMLInputElement, innerInput: HTMLInputElement, hiddenType: HiddenInputType[number] = 'input'): void {
	const hostingForm = getFormByIdOrClosest(inputElement);

	if (!hostingForm || !inputElement) {
		return;
	}

	const hiddenInput = addHiddenInput(hostingForm, inputElement, hiddenType);

	setValueAndValidity(hiddenInput, inputElement.value, innerInput.validationMessage);

	hostingForm.addEventListener('reset', () => {
		inputElement.value = innerInput.value = hiddenInput?.defaultValue ?? '';
		setValueAndValidity(hiddenInput, inputElement.value, innerInput.validationMessage);
	});

	hiddenInput.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});

	inputElement.addEventListener('change', () => {
		setValueAndValidity(hiddenInput, inputElement.value, innerInput.validationMessage);
	});

	inputElement.addEventListener('input', () => {
		setValueAndValidity(hiddenInput, inputElement.value, innerInput.validationMessage);
	});
}