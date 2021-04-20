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

/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(
	callback: (...args: any[]) => void,
	context: unknown,
	waitInMS = 50
) {
	let timeoutId: number;
	return (...args: any[]) => {
		globalThis.clearTimeout(timeoutId);
		timeoutId = globalThis.setTimeout(() => callback.apply(context, args), waitInMS);
	};
}
