import { create } from '@storybook/theming/create';
import scheme from '@vonage/vvd-scheme/vvd-scheme.js';
import initFonts from '@vonage/vvd-fonts/vvd-fonts.js';

Promise.all([
	scheme.init(),
	initFonts.init()
]).then(() => console.info('init Vivid theme for main Storybook app done'));

export default create({
	base: 'light',
	colorSecondary: 'black',

	appBorderRadius: 6,

	fontBase: 'var(--vvd-font-family-spezia), sans-serif',
	fontCode: 'monospace',

	textColor: '#131415',
	barSelectedColor: 'black',

	brandTitle: 'Vivid, the Vonage Design System',
	brandImage: './assets/vvd-logo.svg',
	brandUrl: 'http://vivid.vonage.com'
});
