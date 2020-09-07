export function getFormByIdOrClosest(element: any): HTMLFormElement | null {
	const formId = element.form;
	const formElement = formId ? document.getElementById(formId) : element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

export function addHiddenInput(hostingForm: HTMLElement, { name, value }: { name: string, value: string }) {
	const hiddenInput = document.createElement('input');
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', name);
	hiddenInput.defaultValue = value;
	hostingForm.appendChild(hiddenInput);

	return hiddenInput;
}

export function setValueAndValidity(inputField: HTMLInputElement | undefined, value: string, validationMessage = '') {
	if (!inputField) {
		return;
	}
	inputField.value = value;
	inputField.setCustomValidity(validationMessage);
}

export function addInputToForm(inputElement: any): void {
	const hostingForm = getFormByIdOrClosest(inputElement);

	if (!hostingForm) {
		return;
	}

	inputElement.hiddenInput = addHiddenInput(hostingForm, inputElement);
	setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);

	hostingForm.addEventListener('reset', () => {
		inputElement.value = inputElement.formElement.value = inputElement.hiddenInput?.defaultValue ?? '';
		setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);
	});

	inputElement.hiddenInput.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});

	inputElement.addEventListener('change', () => {
		setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);
	});

	inputElement.addEventListener('input', () => {
		setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);
	});
}