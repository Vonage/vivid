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
		let result = htmlText
			.replace('href="../readme.md"', 'href="/?path=/story/introduction-meet-vivid--meet-vivid"');
		result += `
			<style>
				h3 > img {
					height: 36px;
					width: auto;
				}
			</style>
		`;
		return result;
	}
};