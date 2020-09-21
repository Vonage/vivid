export function getFormByIdOrClosest(
	element: HTMLElement
): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId
		? document.getElementById(formId)
		: element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}
