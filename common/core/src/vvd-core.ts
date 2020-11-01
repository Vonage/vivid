import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import schemeService, { SchemeOption } from '@vonage/vvd-scheme';

const VVD_CONTEXT_ATTRIBUTE = 'data-vvd-context',
	NONE_INIT_VALUE = 'none',
	VALID_CONFIGURATION_KEYS = ['scheme'];

export interface Configuration {
	autoInit: boolean;
	scheme?: SchemeOption;
}

let coreAutoInitDone: Promise<Record<string, unknown>>;
const initialConfiguration = _buildConfiguration();
if (initialConfiguration.autoInit) {
	coreAutoInitDone = _applyConfiguration(initialConfiguration);
} else {
	coreAutoInitDone = Promise.reject(
		`auto-init unavailable when '${NONE_INIT_VALUE}' used`
	);
}

export default Object.freeze({
	set: safeApplyConfiguration,
	settled: coreAutoInitDone,
});

async function safeApplyConfiguration(
	configuration: Partial<Configuration>
): Promise<Record<string, unknown>> {
	_validateConfiguration(configuration);
	return _applyConfiguration(configuration);
}

async function _applyConfiguration(
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

function _buildConfiguration(): Configuration {
	const result: Configuration = {
		autoInit: true,
	};
	const vvdContextAttrValue = document.documentElement.getAttribute(
		VVD_CONTEXT_ATTRIBUTE
	);
	if (vvdContextAttrValue === NONE_INIT_VALUE) {
		result.autoInit = false;
	} else {
		//	TODO: parse the value and build configuration as appropriate
	}
	return result;
}

function _validateConfiguration(configuration: Partial<Configuration>) {
	const extraParams = Object.keys(configuration).filter(
		(k) => !VALID_CONFIGURATION_KEYS.includes(k)
	);

	if (extraParams.length) {
		console.warn(
			`unexpected configuration part/s '${extraParams}',	only some of '${VALID_CONFIGURATION_KEYS}' expected`
		);
	}
}
