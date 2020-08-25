import { init as coreInit } from '@vonage/vvd-core';
import { style } from './vvd-context.css';

/**
 * Vivid context initialiser
 * this API is a 'customer facing' one - meant to be used by a consuming application to initialise the Vivid context, services and resource for the application as a whole
 *
 * @param services map of services to initialise; keys are a service names, values are an options to pass to those services upon initialisation
 * @returns a compound Promise of all initialisation Promises of the participating parties (services, resources etc)
 */
async function init(services: Record<string, unknown>): Promise<void[]> {
	injectGlobalStyle();
	return await coreInit(services);
}

function injectGlobalStyle() {
	const globalStyleSheet = document.createElement('style');
	globalStyleSheet.type = 'text/css';
	globalStyleSheet.innerHTML = style.cssText;
	document.head.appendChild(globalStyleSheet);
}

export default Object.freeze({
	init
});
