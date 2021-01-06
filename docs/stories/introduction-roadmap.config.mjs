import { relocateStaticResources } from '../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../roadmap.md',
	outputName: 'introduction-roadmap',
	story: {
		title: 'Introduction/Roadmap',
		name: 'Roadmap',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: htmlText => {
		return relocateStaticResources(htmlText, ['assets/images/roadmap.svg'], 'docs')
			.replace('href="../readme.md"', 'href="/?path=/story/introduction-meet-vivid--meet-vivid"');
	}
}