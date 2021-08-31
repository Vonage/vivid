import '@vonage/vwc-textarea';
import { storiesToElement } from '../../utils/storiesToElement';
import * as stories from '@vonage/vwc-textarea/stories/textarea.stories';

export async function createElementVariations(wrapper) {
	const textElementWrapper = storiesToElement(stories);

	wrapper.appendChild(textElementWrapper);

	await new Promise(res => setTimeout(() => {
		[...textElementWrapper.querySelectorAll('vwc-textfield')].forEach((child) => {
			child.reportValidity();
			child.firstElementChild.blur();
		});
		res();
	}, 0));
}


