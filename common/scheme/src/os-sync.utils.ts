import { PredefinedScheme } from './vvd-scheme-foundation.js';

export const pcs = window.matchMedia('(prefers-color-scheme: dark)');

export function getPreferedColorScheme(): PredefinedScheme {
	return pcs.matches ? PredefinedScheme.DARK : PredefinedScheme.LIGHT;
}

export function prefersColorSchemeSupported(): boolean {
	return pcs.media !== 'not all';
}
