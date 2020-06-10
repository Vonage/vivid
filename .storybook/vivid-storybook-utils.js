import scheme from '@vonage/vvd-scheme/vvd-scheme.js';
import initFonts from '@vonage/vvd-fonts/vvd-fonts.js';

Promise.all([
	scheme.init(),
	initFonts.init()
]).then(() => console.info('init Vivid theme for preview frame done'));