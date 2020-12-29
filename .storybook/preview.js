import '@vonage/vwc-theme-switch';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdContext from '@vonage/vvd-context';

vvdContext.mount()
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
					['Meet Vivid', 'Getting Started', 'Architecture', 'Roadmap', 'Contacts', 'Components List'],
					'Guides',
					['Installation', 'Context'],
					'Design System',
					['Introduction'],
					'Components',
					['Atoms', 'Composite'],
				],
				method: 'alphabetical'
			},
			showPanel: true
		}
	});
}

run();