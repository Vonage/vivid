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
		return htmlText
			.replace('href="./architecture.md"', 'href="/?path=/story/introduction-architecture--architecture"');
	}
};