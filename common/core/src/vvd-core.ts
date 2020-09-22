import configurer, { Configuration } from './vvd-configurer.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import schemeService from '@vonage/vvd-scheme';

let coreAutoInitDone: Promise<Array<unknown>>;
if (configurer.initialConfiguration.autoInit) {
	coreAutoInitDone = applyConfiguration(configurer.initialConfiguration);
} else {
	coreAutoInitDone = Promise.reject('auto-init unavailable when "none" used');
}

export default Object.freeze({
	set: applyConfiguration,
	settled: coreAutoInitDone,
});

async function applyConfiguration(configuration: Partial<Configuration>) {
	configurer.validateConfiguration(configuration);
	return init(configuration);
}

async function init(
	configuration: Partial<Configuration>
): Promise<Array<unknown>> {
	return Promise.all([fonts.init(), schemeService.set(configuration.scheme)]);
}
