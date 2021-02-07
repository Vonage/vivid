import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../getting-started.md',
	outputName: 'introduction-getting-started',
	story: {
		title: 'Introduction/Getting Started',
		name: 'GettingStarted',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false,
			},
		},
	},
	htmlPostProcess: (htmlText) => {
		let r = relocateStaticResources(
			htmlText,
			['assets/images/getting-started.svg'],
			'docs'
		);
		return hrefLinkProcessing(r, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid'],
		]);
	},
};
