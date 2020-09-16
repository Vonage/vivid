import '@vonage/vwc-scheme-select';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdCore from '@vonage/vvd-core';
import '@vonage/vvd-context';

vvdCore.coreReady
	.then(() => console.info('init Vivid context done (preview frame)'));

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
