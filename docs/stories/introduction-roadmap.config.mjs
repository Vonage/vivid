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
		return htmlText
			.replace('href="../readme.md"', 'href="/?path=/story/introduction-meet-vivid--meet-vivid"');
	}
}