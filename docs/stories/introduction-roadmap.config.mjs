import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../roadmap.md',
	outputName: 'introduction-roadmap',
	story: {
		title: 'Introduction/Roadmap',
		name: 'Roadmap',
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
			['assets/images/roadmap.svg'],
			'docs'
		);
		return hrefLinkProcessing(r, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid'],
		]);
	},
};
