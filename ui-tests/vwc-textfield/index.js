import vvdCore from '@vonage/vvd-core';
import { VWCTextField } from '@vonage/vwc-textfield';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';
import { render } from 'lit-html';

VWCTextField;

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = Object.keys(stories)
		.reduce((htmlString, currStory) => {
			const tmpWrapper = document.createElement('div');
			const currStoryGenerator = stories[currStory];

			if (currStory === 'default' || typeof currStoryGenerator !== 'function') return;

			const currStoryContent = currStoryGenerator(currStoryGenerator.args);
			render(currStoryContent, tmpWrapper);

			const formerString = typeof htmlString === 'string' ?
				`${htmlString}` : '';

			return `${formerString} ${tmpWrapper.innerHTML}`;
		}, '');

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


