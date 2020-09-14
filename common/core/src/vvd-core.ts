import configurer, { Configuration } from './vvd-configurer.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import schemeService from '@vonage/vvd-scheme';

console.info(`Vivid initial configuration: ${JSON.stringify(configurer.initialConfiguration)}`);

let coreAutoInitDone: Promise<Array<void>>;
if (!configurer.initialConfiguration.manual) {
	coreAutoInitDone = applyConfiguration(configurer.initialConfiguration);
} else {
	coreAutoInitDone = Promise.reject('auto-init unavailable when manual configuration required');
}

export default Object.freeze({
	set: applyConfiguration,
	coreReady: coreAutoInitDone
});

async function applyConfiguration(configuration: Partial<Configuration>) {
	configurer.validateConfiguration(configuration);
	return init(configuration);
}

async function init(configuration: Partial<Configuration>): Promise<Array<void>> {
	return Promise.all([
		fonts.init(),
		schemeService.set(configuration.scheme)
	]);
}