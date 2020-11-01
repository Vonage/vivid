import configurer, { Configuration } from './vvd-configurer.js';
import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import schemeService from '@vonage/vvd-scheme';

let coreAutoInitDone: Promise<Record<string, unknown>>;
if (configurer.initialConfiguration.autoInit) {
	coreAutoInitDone = applyConfiguration(configurer.initialConfiguration);
} else {
	coreAutoInitDone = Promise.reject('auto-init unavailable when "none" used');
}

export default Object.freeze({
	set: applyConfiguration,
	settled: coreAutoInitDone,
});

async function applyConfiguration(
	configuration: Partial<Configuration>
): Promise<Record<string, unknown>> {
	configurer.validateConfiguration(configuration);
	return init(configuration);
}

async function init(
	configuration: Partial<Configuration>
): Promise<Record<string, unknown>> {
	const allResults = await Promise.all([
		fonts.init(),
		schemeService.set(configuration.scheme),
	]);
	return Object.freeze({
		fonts: allResults[0],
		scheme: allResults[1],
	});
}
