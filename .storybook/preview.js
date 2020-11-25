import '@vonage/vwc-scheme-select';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdCore from '@vonage/vvd-core';

vvdCore.settled
	.then(() => console.info('init Vivid core done (preview frame)'))
	.catch(e => console.error(e));

async function run() {
	setCustomElements(customElements);
	addParameters({
		docs: {
			inlineStories: true,
		},
		options: {
			storySort: (a, b) => a[1].kind.localeCompare(b[1].kind)
		}
	});
}

run();
