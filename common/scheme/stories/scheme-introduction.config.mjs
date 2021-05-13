import {
	hrefLinkProcessing,
	relocateStaticResources,
} from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../readme.md',
	outputName: 'scheme-introduction',
	story: {
		title: 'Core/Scheme/Introduction',
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
			'assets/images/scheme-flow-diagram.svg',
			'assets/images/scheme-featured-image.svg'
		], 'common/scheme');
		r = hrefLinkProcessing(r, [
			[
				'href="/common/core"',
				'?path=/story/core-introduction--introduction',
			],
			[
				'href="/components/theme-switch"',
				'?path=/story/components-composite-theme-switch--basic',
			]
		]);
		return r;
	},
};
