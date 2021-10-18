import '@vonage/vwc-textarea';
import {storiesToElement} from '../../utils/storiesToElement';
import {Default, Dense, Disabled, Required, Resizable} from '@vonage/vwc-textarea/stories/textarea.stories';

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement([
		Default, Dense, Disabled, Required, Resizable]);

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


