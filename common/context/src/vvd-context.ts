import { init as initCore } from '@vonage/vvd-core';
import { style as globalStyle } from './vvd-context.css';

/**
 * Vivid context initialiser
 * this API is a 'customer facing' one - meant to be used by a consuming application to initialise the Vivid context, services and resource for the application as a whole
 *
 * @param services map of services to initialise; keys are a service names, values are an options to pass to those services upon initialisation
 */
export default async function init(services: Record<string, unknown>): Promise<void> {
	injectGlobalStyle();
	await initCore(services);
}

function injectGlobalStyle() {
	const ds = document.createElement('style');
	ds.type = 'text/css';
	ds.innerHTML = globalStyle.cssText;
	document.head.appendChild(ds);
}