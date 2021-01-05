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
		return htmlText
			.replace('href="../readme.md"', 'href="/?path=/story/introduction-meet-vivid--meet-vivid"');
	}
};