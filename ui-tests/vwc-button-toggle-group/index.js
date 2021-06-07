import vvdCore from '@vonage/vvd-core';
import * as stories from '@vonage/vwc-button-toggle-group/stories/toggle-buttons-group.stories';
import { render } from 'lit-html';
import { VWCButtonToggleGroup } from '@vonage/vwc-button-toggle-group';

VWCButtonToggleGroup;

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

	await vvdCore.settled;
}


