import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../readme.md',
	outputName: 'core-introduction',
	story: {
		title: 'Core/Introduction',
		name: 'Introduction',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: (htmlText) => {
		let r = relocateStaticResources(htmlText, [
			'assets/vivid-core-flow.svg'
		], 'common/core');
		return r;
	}
};