import { requestSubmit } from '../form-association';
import { getFormByIdOrClosest } from './common';

function handleKeyDown(this: HTMLInputElement, event: KeyboardEvent) {
	event.preventDefault();

	const form = getFormByIdOrClosest(this);
	if (!form) {
		return;
	}

	if ((this.dataset.keys?.split(',') || []).includes(event.key)) {
		requestSubmit(form);
	}
}

export function submitOnKeys(element: HTMLInputElement, keys: string[] = []) {
	element.removeEventListener('keydown', handleKeyDown);
	element.removeAttribute('data-keys');

	if (keys.length === 0) {
		return;
	}

	element.setAttribute('data-keys', keys.join(','));

	element.addEventListener('keydown', handleKeyDown);
}
