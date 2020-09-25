function isElementSubmit(element: Element) {
	return Boolean(
		element.getAttribute('type') === 'submit' ||
			(element.nodeName === 'BUTTON' && element.getAttribute('type') === null)
	);
}

function findFormSubmitButtons(form: HTMLFormElement) {
	const formElements = [...form.elements];
	return formElements.filter(isElementSubmit);
}

export function requestSubmit(form: HTMLFormElement): void {
	const formSubmitButtons = findFormSubmitButtons(form);
	if (!formSubmitButtons.length) {
		return;
	}

	(formSubmitButtons[0] as HTMLElement).click();
}
