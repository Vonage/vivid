import '@vonage/vwc-textarea';
import { storiesToElement } from '../../utils/storiesToElement';
import * as stories from '@vonage/vwc-textarea/stories/textarea.stories';

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement(stories);

	wrapper.appendChild(elementWrapper);

	wrapper.classList.add('grid');
	elementWrapper.classList.add('grid');

	await new Promise(res => setTimeout(() => {
		[...elementWrapper.querySelectorAll('vwc-textfield')].forEach((child) => {
			child.reportValidity();
			child.firstElementChild.blur();
		});
		res();
	}, 0));
}


