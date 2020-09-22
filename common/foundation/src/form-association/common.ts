export interface InputElement extends HTMLElement {
	name: string | undefined;
	value: string;
}

export function getFormByIdOrClosest<T extends InputElement>(
	element: T
): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId
		? document.getElementById(formId)
		: element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}
