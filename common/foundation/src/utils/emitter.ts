export class Emitter {
	#delegate = document.createDocumentFragment();

	addEventListener(
		type: string,
		listener: EventListener | EventListenerObject | null,
		options?: boolean | AddEventListenerOptions | undefined
	): void {
		this.#delegate.addEventListener(type, listener, options);
	}

	dispatchEvent(event: Event): void {
		this.#delegate.dispatchEvent(event);
	}

	removeEventListener(
		type: string,
		callback: EventListener | EventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined
	): void {
		this.#delegate.removeEventListener(type, callback, options);
	}
}
