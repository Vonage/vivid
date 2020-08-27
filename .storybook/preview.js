import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import context from '@vonage/vvd-context';

context
	.init()
	.then(() => console.info('init Vivid context done (preview frame)'));

// Initialize material icons (TBD: Remove once all MWC icons have been replaced by VWC alternative)
document.querySelector('head').appendChild(
	(function(){
		const linkEl = document.createElement('link');
		linkEl.href = "https://fonts.googleapis.com/css?family=Material+Icons&display=block";
		linkEl.rel = "stylesheet";
		return linkEl;
	})()
);

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
