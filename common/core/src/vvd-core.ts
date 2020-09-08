import configuration, { Configuration } from './config-resolver.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import schemeService from '@vonage/vvd-scheme';

let
	initResolver: (value?: unknown) => void | PromiseLike<void>,
	initRejector: (reason?: unknown) => void | PromiseLike<void>;

export const coreReady = new Promise((resolve, reject) => {
	initResolver = resolve;
	initRejector = reject;
});

console.debug('effective config', JSON.stringify(configuration));
init(configuration);

async function init({ scheme }: Configuration): Promise<void> {
	Promise
		.all([
			fonts.init(),
			schemeService.set(scheme)
		])
		.then(initResolver)
		.catch(initRejector);
}