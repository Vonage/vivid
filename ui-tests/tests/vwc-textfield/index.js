import '@vonage/vwc-textfield';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { storiesToElement } from '../../utils/storiesToElement';


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
	// temporary delay to prevent test failure due to floating label initial transition
	// should be handled in textfield refactoring
	await new Promise(resolve => setTimeout(resolve, 500));
}


