/**
 * This module exposes internal APIs to manage a Vivid overlay configuration state
 * state machine revolves over:
 * - uninitialised state for all
 * - first init merge where undefined resolved to defaults
 * - following merges applied over an existing state (undefined is not to touch)
 *
 * Static way to pre-configure Vivid is via `data-vvd-context` attribute on the HTML element.
 * As of now, only a single keyword token value is supported:
 * - none: suspend auto-init, to be used in custom initialization flavor
 */
import { SchemeOption } from '@vonage/vvd-scheme';

const VVD_CONTEXT_ATTRIBUTE = 'data-vvd-context',
	MANUAL_KEY = 'none',
	VALID_CONFIGURATION_KEYS = [MANUAL_KEY, 'fonts', 'scheme'];

export interface Configuration {
	autoInit: boolean;
	scheme?: SchemeOption;
}
export default Object.freeze({
	initialConfiguration: buildInitialConfiguration(),
	validateConfiguration,
});

function buildInitialConfiguration(): Configuration {
	const result: Configuration = {
		autoInit: true,
	};
	const vvdContextAttrValue = document.documentElement.getAttribute(
		VVD_CONTEXT_ATTRIBUTE
	);
	if (vvdContextAttrValue === MANUAL_KEY) {
		result.autoInit = false;
	}
	return result;
}

function validateConfiguration(configuration: Partial<Configuration>) {
	const extraParams = Object.keys(configuration).filter(
		(k) => !VALID_CONFIGURATION_KEYS.includes(k)
	);

	if (extraParams.length) {
		throw new Error(
			`unexpected configuration part/s '${extraParams}',	only some of '${VALID_CONFIGURATION_KEYS}' expected`
		);
	}
}
