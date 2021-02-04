import {
	hrefLinkProcessing,
	relocateStaticResources
} from '../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../architecture.md',
	outputName: 'introduction-architecture',
	story: {
		title: 'Introduction/Architecture',
		name: 'Architecture',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: htmlText => {
		let r = relocateStaticResources(htmlText, ['assets/images/architecture.svg', 'assets/images/vivid-code-transformation-flow.svg'], 'docs');
		return hrefLinkProcessing(r, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid']
		]);
	}
};