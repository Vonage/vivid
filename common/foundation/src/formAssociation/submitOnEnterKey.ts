import { requestSubmit } from '../form-association';
import { getFormByIdOrClosest } from './common';

export function submitOnEnter(element: HTMLInputElement) {
	element.addEventListener('keydown', function (
		this: HTMLInputElement,
		event: KeyboardEvent
	) {
		event.preventDefault();

		const form = getFormByIdOrClosest(this);
		if (!form) {
			return;
		}

		if (event.key === 'Enter') {
			requestSubmit(form);
		}
	});
}
