import '@vonage/vwc-textfield';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { storiesToElement } from '../../utils/storiesToElement';


export async function createElementVariations(wrapper) {
	const testWrapper = storiesToElement(stories);
	wrapper.classList.add('grid');
	testWrapper.classList.add('grid');
	wrapper.appendChild(testWrapper);

	await new Promise(res => setTimeout(() => {
		[...testWrapper.querySelectorAll('vwc-textfield')].forEach((child) => {
			child.reportValidity();
			child.firstElementChild.blur();
		});
		res();
	}, 0));

	await new Promise(resolve => setTimeout(resolve, 500));
}


