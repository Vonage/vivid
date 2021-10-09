import { render } from 'lit';

export function storiesToElement(stories) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = Object.keys(stories)
		.reduce((htmlString, currStory) => {
			const tmpWrapper = document.createElement('div');
			const currStoryGenerator = stories[currStory];

			if (currStory === 'default' || typeof currStoryGenerator !== 'function') return htmlString;

			const currStoryContent = currStoryGenerator(currStoryGenerator.args);
			render(currStoryContent, tmpWrapper);

			const formerString = typeof htmlString === 'string' ?
				`${htmlString}` : '';

			return `${formerString} ${tmpWrapper.innerHTML}`;
		}, '');
	return textElementWrapper;
}
