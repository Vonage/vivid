import { hrefLinkProcessing } from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../../volta-to-vivid.md',
	outputName: 'context-volta-to-vivid',
	story: {
		title: 'Guides/Volta To Vivid Migration',
		name: 'VoltaToVividMigration',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false,
			},
		},
	},
	htmlPostProcess: (htmlText) => {
		return hrefLinkProcessing(htmlText, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid'],
			[
				'href="./architecture.md"',
				'?path=/story/introduction-architecture--architecture',
			],
		]);
	},
};
