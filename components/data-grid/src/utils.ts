export const emitCustomEventFactory = (target: HTMLElement) => (
		eventType: string,
		detail: unknown,
		options = { bubbles: true, composed: true }
	): void => {
		const event = new CustomEvent(eventType, { ...options, detail });
		target.dispatchEvent(event);
	},
	hypenateAndLowercase = (input: string): string =>
		input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
