import { relocateStaticResources } from '../../.storybook/build-scripts/create-stories-from-md.mjs';

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
		return relocateStaticResources(htmlText, ['docs/assets/images/meet-vivid.svg'])
			.replace('href="docs/getting-started.md"', 'href="/?path=/story/introduction-getting-started--getting-started"')
			.replace('href="docs/architecture.md"', 'href="/?path=/story/introduction-architecture--architecture"')
			.replace('href="docs/roadmap.md"', 'href="/?path=/story/introduction-roadmap--roadmap"')
			.replace('href="docs/contact-us.md"', 'href="/?path=/story/introduction-contact-us--contact-us"')
			.replace('href="docs/installation.md"', 'href="?path=/story/guides-installation--installation"')
			.replace('href="docs/contribution.md"', 'href="?path=/story/guides-contribution--contribution"');
	}
};