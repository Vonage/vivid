export function handleAutofocus(targetElement: HTMLElement): void {
	if (!targetElement || !targetElement.hasAttribute) {
		console.error(`HTMLElement target expected, got '${targetElement}'`);
		return;
	}
	if (targetElement.hasAttribute('autofocus')) {
		const rootNode = targetElement.getRootNode();
		if (
			('activeElement' in rootNode &&
				!(rootNode as Document).activeElement?.matches(':focus')) ||
			('matches' in rootNode &&
				!(rootNode as HTMLElement).matches(':focus-within'))
		) {
			targetElement.focus();
		}
	}
}
