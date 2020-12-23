import '@vonage/vwc-theme-switch';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdCore from '@vonage/vvd-core';

vvdCore.settled
	.then(() => console.info('init Vivid core done (preview frame)'))
	.catch(e => console.error(e));

const TOPIC_ORDERING = {
	'Introduction': 0,
	'Guides': 1,
	'Design System': 2,
	'Components': 3
};

async function run() {
	setCustomElements(customElements);
	addParameters({
		docs: {
			inlineStories: true,
		},
		options: {
			storySort: {
				order: ['Introduction', 'Guides', ['Installation', 'Context'], 'Design System', 'Components'],
				method: 'alphabetical'
			}
		}
	});
}

run();
