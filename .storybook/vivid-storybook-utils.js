import vvdContext from '@vonage/vvd-context';

vvdContext
	.init()
	.then(() => console.info('init Vivid context done'));