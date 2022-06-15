import '@vonage/vwc-textfield';
import {
	Default,
	CharCounter,
	Dense,
	Disabled,
	Icon,
	PillShape,
	Validation,
	AutoValidation,
	Actions,
	Autocomplete
} from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { storiesToElement } from '../../utils/storiesToElement';
import {AppearanceGhost} from "@vonage/vwc-textfield/stories/textfield-variants.stories";


export async function createElementVariations(wrapper) {
	const testWrapper = storiesToElement([
		Default,
		CharCounter,
		Dense,
		AppearanceGhost,
		Disabled,
		Icon,
		PillShape,
		Validation,
		AutoValidation,
		Actions,
		Autocomplete]);

	wrapper.classList.add('grid');
	testWrapper.classList.add('grid');
	wrapper.appendChild(testWrapper);

	await new Promise(res => setTimeout(() => {
		[...testWrapper.querySelectorAll('vwc-textfield[required]')].forEach((child) => {
			child.reportValidity();
			child.firstElementChild.blur();
		});
		res();
	}, 0));
}


