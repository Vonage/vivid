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
	{ name, value }: { name: string; value: string },
	hiddenType: HiddenInputType[number]
) {
	const hiddenInput = document.createElement(hiddenType) as HTMLInputElement;
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', name);
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

export function addInputToForm(
	inputElement: any,
	hiddenType: HiddenInputType[number] = 'input'
): void {
	const hostingForm = getFormByIdOrClosest(inputElement);

	if (!hostingForm || !inputElement) {
		return;
	}

	inputElement.hiddenInput = addHiddenInput(
		hostingForm,
		inputElement,
		hiddenType
	);
	setValueAndValidity(
		inputElement.hiddenInput,
		inputElement.value,
		inputElement.formElement.validationMessage
	);

	hostingForm.addEventListener('reset', () => {
		inputElement.value = inputElement.formElement.value =
			inputElement.hiddenInput?.defaultValue ?? '';
		setValueAndValidity(
			inputElement.hiddenInput,
			inputElement.value,
			inputElement.formElement.validationMessage
		);
	});

	inputElement.hiddenInput.addEventListener('invalid', (event: Event) => {
		event.stopPropagation();
		event.preventDefault();
	});

	inputElement.addEventListener('change', () => {
		setValueAndValidity(
			inputElement.hiddenInput,
			inputElement.value,
			inputElement.formElement.validationMessage
		);
	});

	inputElement.addEventListener('input', () => {
		setValueAndValidity(
			inputElement.hiddenInput,
			inputElement.value,
			inputElement.formElement.validationMessage
		);
	});
}

export function requestSubmit(form: HTMLFormElement) {
	if (form.requestSubmit) {
		form.requestSubmit();
		return;
	}
	const fakeButton = document.createElement('button');
	fakeButton.style.display = 'none';
	form.appendChild(fakeButton);
	fakeButton.click();
	fakeButton.remove();
}

function handleKeyDown(this: HTMLInputElement, event: KeyboardEvent) {
	event.preventDefault();

	const form = getFormByIdOrClosest(this);
	if (!form) {
		return;
	}

	if ((this.dataset.keys?.split(',') || []).includes(event.key)) {
		requestSubmit(form);
	}
}

export function submitOnKeys(element: HTMLInputElement, keys: string[] = []) {
	element.removeEventListener('keydown', handleKeyDown);
	element.removeAttribute('data-keys');

	if (keys.length === 0) {
		return;
	}

	element.setAttribute('data-keys', keys.join(','));

	element.addEventListener('keydown', handleKeyDown);
}
