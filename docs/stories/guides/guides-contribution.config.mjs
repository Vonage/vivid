import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../../contribution.md',
	outputName: 'guides-contribution',
	story: {
		title: 'Guides/Contribution',
		name: 'Contribution',
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
			['assets/images/contribution.svg'],
			'docs'
		);
		return hrefLinkProcessing(r, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid'],
			[
				'href="./architecture.md"',
				'?path=/story/introduction-architecture--architecture',
			],
		]);
	},
};
