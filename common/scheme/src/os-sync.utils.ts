import { not } from 'ramda';

export const pcs = window.matchMedia('(prefers-color-scheme: dark)');

export function getPreferedColorScheme() {
	return pcs.matches ? 'dark' : 'light';
}

export function prefersColorSchemeSupported() {
	return not(pcs.media === 'not all');
}
