import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../../installation.md',
	outputName: 'guides-installation',
	story: {
		title: 'Getting Started/Installation',
		name: 'Installation',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false,
			},
		},
	},
	htmlPostProcess: (htmlText) => {
		const r = relocateStaticResources(
			htmlText,
			['assets/images/installation.svg'],
			'docs'
		);
		return hrefLinkProcessing(r, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid'],
		]);
	},
};
