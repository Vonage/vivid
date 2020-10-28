export function handleAutofocus(targetElement: HTMLElement): void {
	if (!targetElement) {
		console.error(`target element expected, got '${targetElement}'`);
		return;
	}
	if (targetElement.hasAttribute('autofocus')) {
		const rootNode = targetElement.getRootNode();
		if (
			('hasFocus' in rootNode && !(rootNode as Document).hasFocus()) ||
			('matches' in rootNode &&
				!(rootNode as HTMLElement).matches(':focus-within'))
		) {
			Promise.resolve().then(() => targetElement.focus());
		}
	}
}
