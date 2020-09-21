import { PredefinedScheme } from './vvd-scheme';

export const pcs = window.matchMedia('(prefers-color-scheme: dark)');

export function getPreferedColorScheme(): PredefinedScheme {
	return pcs.matches ? 'dark' : 'light';
}

export function prefersColorSchemeSupported(): boolean {
	return pcs.media !== 'not all';
}
