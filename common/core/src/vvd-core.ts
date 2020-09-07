import configuration from './config-resolver.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import scheme, { SchemeOption } from '@vonage/vvd-scheme';

let
	initResolver: (value?: unknown) => void | PromiseLike<void>,
	initRejector: (reason?: unknown) => void | PromiseLike<void>;

export const coreReady = new Promise((resolve, reject) => {
	initResolver = resolve;
	initRejector = reject;
});

console.debug('effective config', JSON.stringify(configuration));
init(configuration);

async function init(config: { scheme?: SchemeOption }): Promise<void> {
	Promise
		.all([
			fonts.init(),
			scheme.set(config?.scheme)
		])
		.then(initResolver)
		.catch(initRejector);
}