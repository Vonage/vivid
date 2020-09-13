const types = ['checkbox', 'textarea', 'input'];
export type HiddenInputType = typeof types;

function getFormByIdOrClosest(element: HTMLElement): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId ? document.getElementById(formId) : element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function addHiddenInput(hostingForm: HTMLElement, { name, value }: { name: string, value: string }, hiddenType: HiddenInputType[number]) {
	const hiddenInput = document.createElement(hiddenType) as HTMLInputElement;
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', name);
	hiddenInput.defaultValue = value;
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

function resetFormFactory(inputElement: any) {
	return () => {
		inputElement.value = inputElement.formElement.value = inputElement.hiddenInput?.defaultValue ?? '';
		setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);
	};
}

function silenceInvalidEvent(inputElement: HTMLFormElement) {
	inputElement.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});
}

function setInputUpdateEvent(eventName: string, inputElement: any) {
	inputElement.addEventListener(eventName, () => {
		setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);
	});
}

function isElementRemoved(mutations: MutationRecord[], element: any) {
	return mutations
		.filter((mutation: MutationRecord) => [...mutation.removedNodes]
			.find(removedElement => removedElement === element)).length > 0;
}

export function addInputToForm(inputElement: any, hiddenType: HiddenInputType[number] = 'input'): void {
	const resetFormHandler = resetFormFactory(inputElement);
	const handleInputElementRemove = (mutations: MutationRecord[]) => {
		if (isElementRemoved(mutations, inputElement)) {
			inputElement.hiddenInput.remove();
			hostingForm?.removeEventListener('reset', resetFormHandler);
		}
	};

	const hostingForm = getFormByIdOrClosest(inputElement);

	if (!hostingForm || !inputElement) {
		return;
	}

	inputElement.hiddenInput = addHiddenInput(hostingForm, inputElement, hiddenType);
	setValueAndValidity(inputElement.hiddenInput, inputElement.value, inputElement.formElement.validationMessage);

	hostingForm.addEventListener('reset', resetFormHandler);
	const elementObserver = new MutationObserver(handleInputElementRemove);
	elementObserver.observe(inputElement.parentNode, { childList: true });

	silenceInvalidEvent(inputElement.hiddenInput);

	setInputUpdateEvent('change', inputElement);
	setInputUpdateEvent('input', inputElement);
}