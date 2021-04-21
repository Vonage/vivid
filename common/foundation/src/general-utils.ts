export * from './utils/emitter';

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

export function handleMultipleDenseProps(
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

export function assert(condition: unknown, msg?: string): asserts condition {
	if (!condition) {
		throw new Error(msg);
	}
}

export function debounced(waitInMS = 50) {
	let timeoutId: number;
	return function (target: any, propertyKey: string) {
		const result = function (...args: []) {
			globalThis.clearTimeout(timeoutId);
			timeoutId = globalThis.setTimeout(() => target[propertyKey](...args), waitInMS);
		};
		return result as TypedPropertyDescriptor<() => void>;
	};
}
