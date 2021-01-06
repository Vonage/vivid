import { relocateStaticResources } from '../../.storybook/build-scripts/create-stories-from-md.mjs';

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
		return relocateStaticResources(htmlText, ['assets/images/architecture.svg', 'assets/images/vivid-code-transformation-flow.svg'], 'docs')
			.replace('href="../readme.md"', 'href="/?path=/story/introduction-meet-vivid--meet-vivid"');
	}
};