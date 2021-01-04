export default {
	sourcePath: '../../readme.md',
	outputName: 'introduction-meet-vivid',
	story: {
		title: 'Introduction/Meet Vivid',
		name: 'MeetVivid',
		parameters: {
			options: {
				showPanel: false,
				isToolshown: false
			}
		}
	},
	mdPreProcess: mdText => {
		return mdText
			.replace(/^[^#]*/, '');
	},
	htmlPostProcess: htmlText => {
		return htmlText;
	}
};