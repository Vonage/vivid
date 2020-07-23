import scheme from '@vonage/vvd-scheme/vvd-scheme.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts-b.js';

Promise.all([
	scheme.init(),
	fonts.init()
]).then(() => console.info('init Vivid theme for preview frame done'));