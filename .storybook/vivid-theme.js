import { create } from '@storybook/theming/create';
import { contextInitPromise } from '@vonage/vvd-context';

contextInitPromise
	.then(() => console.info('init Vivid context done (main page)'));

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
