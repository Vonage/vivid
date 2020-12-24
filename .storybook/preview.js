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
		controls: {
			expanded: true
		},
		options: {
			storySort: {
				order: [
					'Introduction',
					['General', 'Architecture'],
					'Guides',
					['Installation', 'Context'],
					'Design System',
					['Introduction'],
					'Components'],
				method: 'alphabetical'
			},
			showPanel: true
		}
	});
}

run();