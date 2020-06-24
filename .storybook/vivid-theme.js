import { create } from '@storybook/theming/create';
import './vivid-storybook-utils.js';

export default create({
	base: 'light',
	colorSecondary: 'black',

	appBorderRadius: 6,

	fontBase: 'var(--vvd-font-family-spezia), sans-serif',
	fontCode: 'monospace',

	textColor: '#131415',
	barSelectedColor: 'black',

	brandTitle: 'Vivid, the Vonage Design System',
	brandImage: './assets/images/vvd-logo.svg',
	brandUrl: 'https://vivid.vonage.com'
});
