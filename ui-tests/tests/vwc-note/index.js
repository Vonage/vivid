
import '@vonage/vwc-note';
import * as stories from '@vonage/vwc-note/stories/note.stories';
import { storiesToElement } from '../../utils/storiesToElement';

export async function createElementVariations(wrapper) {
	const storiesWithoutPending = Object.keys(stories).reduce((tmpStories, storyName) => {
		if (storyName != 'Pending') tmpStories[storyName] = stories[storyName];
		return tmpStories;
	}, {});
	wrapper.appendChild(storiesToElement(storiesWithoutPending));
}


