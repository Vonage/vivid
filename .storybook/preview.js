import '@vonage/vwc-theme-switch';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdContext from '@vonage/vvd-context';

vvdContext.install()
	.then(() => console.info('init Vivid core done (preview frame)'))
	.catch(e => console.error(e));

async function run() {
	setCustomElements(customElements);
	addParameters({
		docs: {
			inlineStories: true,
		},
		options: {
			storySort: {
				order: ['Introduction', 'Guides', ['Installation', 'Context'], 'Design System', ['', ''], 'Components'],
				method: 'alphabetical'
			}
		}
	});
}

run();