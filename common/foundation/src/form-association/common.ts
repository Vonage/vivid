export interface InputElement extends HTMLElement {
	name: string | undefined;
	value: string;
}

function findClosestFormThroughShadow(
	element: Element
): HTMLFormElement | null {
	while (element) {
		const form = element.closest('form');
		if (form) {
			return form;
		}
		const root = element.getRootNode() as ShadowRoot;
		if (!root) {
			return null;
		}
		element = root.host;
	}
	return null;
}
export function getFormByIdOrClosest<T extends InputElement>(
	element: T
): HTMLFormElement | null {
	const formId = element.getAttribute('form');
	const formElement = formId
		? document.getElementById(formId)
		: findClosestFormThroughShadow(element);
	return formElement instanceof HTMLFormElement ? formElement : null;
}
