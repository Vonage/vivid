export function handleAutofocus(targetElement: HTMLElement): void {
	if (!targetElement || !targetElement.hasAttribute) {
		console.error(`HTMLElement target expected, got '${targetElement}'`);
		return;
	}
	if (targetElement.hasAttribute('autofocus')) {
		const rootNode = targetElement.getRootNode();
		if (
			('hasFocus' in rootNode && !(rootNode as Document).hasFocus()) ||
			('matches' in rootNode &&
				!(rootNode as HTMLElement).matches(':focus-within'))
		) {
			targetElement.focus();
		}
	}
}
