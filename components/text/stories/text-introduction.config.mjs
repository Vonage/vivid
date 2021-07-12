import {
	relocateStaticResources,
} from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../readme.md',
	outputName: 'text-introduction',
	story: {
		title: 'Alpha/Components/Text',
		name: 'Introduction',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: (htmlText) => {
		return relocateStaticResources(htmlText, [
			'assets/images/headline-1.svg',
			'assets/images/caption.svg'
		], 'components/text');
	},
};
