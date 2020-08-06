import { html } from 'lit-element';

const aiIconTypes = [
	'ai',
	'ai-full',
	'ai-2',
	'ai-2-full',
	'ai-3',
	'ai-3-full',
	'mind-map',
	'mind-map-full',
	'brain',
	'brain-full'
]

export const aiIcons = (style, story) => () => {
	const result = html`
		${style}
		<div class="container">
			${aiIconTypes.map(type => html`<figure><vwc-icon type="${type}"></vwc-icon><figcaption>${type}</figcaption></figure>`)}
		</div>
	`;
	result.story = story;
	return result;
};