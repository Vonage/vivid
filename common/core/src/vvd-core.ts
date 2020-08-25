import fonts from '@vonage/vvd-fonts/vvd-fonts.js';
import scheme from '@vonage/vvd-scheme';

interface ServiceEntry {
	defaultInitParam?: unknown,
	initialiser(initParam: unknown): Promise<void>
}

const servicesRegistry: Record<string, ServiceEntry> = {
	'fonts': {
		defaultInitParam: null,
		initialiser: fonts.init
	},
	'scheme': {
		defaultInitParam: null,
		initialiser: scheme.init
	}
};

export function validateInitParameters(services: Record<string, unknown>): void {
	const knownServices: string[] = Object.keys(servicesRegistry);
	const unknownService = Object.keys(services).find(serviceKey => !knownServices.includes(serviceKey));
	if (unknownService) {
		throw new Error(`unknown service key '${unknownService}' specified for init API`);
	}
}

/**
 * Internal initialiser
 * this API is an internal initialiser of the core services
 *
 * @param services a map of the services requested to be initialised, where the key is the name of the service and the value is the parameter/s to be passed to the service initialisation function
 * @returns compound Promise of all inidividual service initialisation Promises
 */
export async function init(services?: Record<string, unknown>): Promise<void[]> {
	if (services) {
		validateInitParameters(services);
	} else {
		services = servicesRegistry;
	}

	console.log('init services');
	console.log(services);

	const serviceInitPromises = Object
		.entries(services)
		.map(([serviceKey, initParams]) => servicesRegistry[serviceKey].initialiser(initParams));

	return await Promise.all(serviceInitPromises);
}