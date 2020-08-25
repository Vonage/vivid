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

export async function init(services: Record<string, unknown>): Promise<void> {
	validateInitParameters(services);

	const serviceInitPromises = Object
		.entries(services)
		.map(([serviceKey, initParams]) => servicesRegistry[serviceKey].initialiser(initParams));

	await Promise.all(serviceInitPromises);
}