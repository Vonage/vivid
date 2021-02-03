import {
	hrefLinkProcessing,
	relocateStaticResources
} from '../../.storybook/build-scripts/create-stories-from-md.mjs';

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
		let result = relocateStaticResources(htmlText, ['assets/images/contact-us.svg', 'assets/images/logo-slack.svg', 'assets/images/logo-github.svg', 'assets/images/logo-workplace.svg'], 'docs');
		result = hrefLinkProcessing(result, [
			['href="../readme.md"', '?path=/story/introduction-meet-vivid--meet-vivid']
		]);
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