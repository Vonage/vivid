import { create } from '@storybook/theming/create';
import vvdContext from '@vonage/vvd-context';
import vvdCore from '@vonage/vvd-core';

vvdCore.settled
	.then(() => console.info('init Vivid core done (main page)'));

vvdContext.mount()
	.then(() => console.log('init Vivid context into main document done'));

export default create({
	base: 'light',
	colorSecondary: 'black',

	appBorderRadius: 6,

	barSelectedColor: 'black',

	brandTitle: 'Vivid, the Vonage Design System',
	brandImage: './assets/images/vvd-logo.svg',
	brandUrl: 'https://vivid.vonage.com'
});
