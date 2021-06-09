import vvdCore from '@vonage/vvd-core';
import { VWCTextField } from '@vonage/vwc-textfield';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { storiesToElement } from '../utils/storiesToElement';

VWCTextField;

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

	await vvdCore.settled;
}


