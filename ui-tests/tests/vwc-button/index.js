
import vvdCore from '@vonage/vvd-core';
import * as stories from '@vonage/vwc-button/stories/button.stories';
import '@vonage/vwc-button';
import { storiesToElement } from '../../utils/storiesToElement';

export async function createElementVariations(wrapper) {
	const storiesWithoutPending = Object.keys(stories).reduce((tmpStories, storyName) => {
		if (storyName != 'Pending') tmpStories[storyName] = stories[storyName];
		return tmpStories;
	}, {});
	console.log(storiesWithoutPending);
	wrapper.appendChild(storiesToElement(storiesWithoutPending));

	await vvdCore.settled;
}


