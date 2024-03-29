import '@vonage/vwc-theme-switch';
import '@storybook/addon-console';
import { addParameters, setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import vvdContext from '@vonage/vvd-context';

vvdContext.mount()
	.then(() => console.info('init Vivid core done (preview frame)'))
	.catch(e => console.error(e));
document.body.classList.add('vivid-scope');

async function run() {
	setCustomElements(customElements);
	addParameters({
		controls: {
			expanded: true
		},
		html: {
			root: '#root-inner',
			removeEmptyComments: true,
		},
		options: {
			storySort: {
				order: [
					'Introduction',
					['Meet Vivid', 'Getting Started', 'Architecture', 'Roadmap', 'Contact Us'],
					'Getting Started',
					['Installation', 'Usage Examples', 'Contribution', 'Volta To Vivid Migration'],
					'Design System',
					['Introduction'],
					'Core',
					['Context', 'Fonts', 'Typography'],
					'Components',
					['Components List', 'Alpha', 'Composite'],
				],
				method: 'alphabetical'
			},
			showPanel: true
		}
	});
}

run();