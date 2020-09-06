import config from './config-resolver.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import scheme, { SchemeOption } from '@vonage/vvd-scheme';

let
	initResolver: (value?: unknown) => void | PromiseLike<void>,
	initRejector: (reason?: unknown) => void | PromiseLike<void>;

export const coreReady = new Promise((resolve, reject) => {
	initResolver = resolve;
	initRejector = reject;
});

console.debug('effective config', JSON.stringify(config));
init();

async function init(): Promise<void> {
	Promise
		.all([
			fonts.init(),
			scheme.set(config?.scheme as SchemeOption)
		])
		.then(initResolver)
		.catch(initRejector);
}