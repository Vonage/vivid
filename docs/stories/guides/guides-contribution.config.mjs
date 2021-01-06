import { relocateStaticResources } from '../../../.storybook/build-scripts/create-stories-from-md.mjs';

export default {
	sourcePath: '../../contribution.md',
	outputName: 'guides-contribution',
	story: {
		title: 'Guides/Contribution',
		name: 'Contribution',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	htmlPostProcess: htmlText => {
		return relocateStaticResources(htmlText, ['assets/images/contribution.svg'], 'docs')
			.replace('href="./architecture.md"', 'href="/?path=/story/introduction-architecture--architecture"');
	}
};