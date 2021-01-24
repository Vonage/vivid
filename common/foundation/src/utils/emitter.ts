export class Emitter {
	private _delegate = document.createDocumentFragment();

	addEventListener(
		type: string,
		listener: EventListener | EventListenerObject | null,
		options?: boolean | AddEventListenerOptions | undefined
	): void {
		this._delegate.addEventListener(type, listener, options);
	}

	dispatchEvent(event: Event): void {
		this._delegate.dispatchEvent(event);
	}

	removeEventListener(
		type: string,
		callback: EventListener | EventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined
	): void {
		this._delegate.removeEventListener(type, callback, options);
	}
}
