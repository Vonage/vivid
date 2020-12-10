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

export function handleMultipleSizeProps(
	// eslint-disable-next-line
	targetElement: any,
	changes: Map<string, boolean>
): void {
	if (changes.has('dense')) {
		if (targetElement.dense && targetElement.enlarged) {
			targetElement.enlarged = false;
		}
	}

	if (changes.has('enlarged')) {
		if (targetElement.enlarged && targetElement.dense) {
			targetElement.removeAttribute('dense');
			targetElement.dense = false;
		}
	}
}
