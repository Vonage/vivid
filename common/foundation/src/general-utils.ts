export function handleAutofocus(targetElement: HTMLElement): void {
	if (!targetElement || !targetElement.hasAttribute) {
		console.error(`HTMLElement target expected, got '${targetElement}'`);
		return;
	}
	if (
		targetElement.hasAttribute('autofocus') &&
		!document.body.matches(':focus-within')
	) {
		targetElement.focus();
	}
}
