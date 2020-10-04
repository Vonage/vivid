import { requestSubmit } from '../form-association';
import { getFormByIdOrClosest } from './common';

export function submitOnEnter(element: HTMLInputElement): void {
	element.addEventListener('keydown', function (
		this: HTMLInputElement,
		event: KeyboardEvent
	) {
		const form = getFormByIdOrClosest(this);
		if (!form) {
			return;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			requestSubmit(form);
		}
	});
}
