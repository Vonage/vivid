import { relocateStaticResources } from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../../installation.md',
	outputName: 'guides-installation',
	story: {
		title: 'Guides/Installation',
		name: 'Installation',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: htmlText => {
		return relocateStaticResources(htmlText, ['assets/images/installation.svg'], 'docs');
	}
};