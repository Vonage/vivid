import { init as initCore } from '@vonage/vvd-core';

/**
 * Vivid context initialiser
 * @param services map of services to initialise; keys are a service names, values are an options to pass to those services upon initialisation
 */
export default async function init(services: Record<string, unknown>): Promise<void> {
	return initCore(services);
}