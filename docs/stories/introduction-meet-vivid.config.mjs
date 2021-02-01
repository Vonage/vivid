import {
	hrefLinkProcessing,
	relocateStaticResources
} from '../../.storybook/build-scripts/create-stories-from-md.mjs';

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
		let r = relocateStaticResources(htmlText, ['docs/assets/images/meet-vivid.svg']);
		r = hrefLinkProcessing(r, [
			['href="docs/getting-started.md"', '?path=/story/introduction-getting-started--getting-started'],
			['href="docs/architecture.md"', '?path=/story/introduction-architecture--architecture'],
			['href="docs/roadmap.md"', '?path=/story/introduction-roadmap--roadmap'],
			['href="docs/contact-us.md"', '?path=/story/introduction-contact-us--contact-us'],
			['href="docs/installation.md"', '?path=/story/guides-installation--installation'],
			['href="docs/contribution.md"', '?path=/story/guides-contribution--contribution']
		]);
		return r;
	}
};
