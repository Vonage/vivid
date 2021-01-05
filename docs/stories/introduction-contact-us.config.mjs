export default {
	sourcePath: '../contact-us.md',
	outputName: 'introduction-contact-us',
	story: {
		title: 'Introduction/Contact Us',
		name: 'ContactUs',
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