import { not } from 'ramda';

export const pcs = window.matchMedia('(prefers-color-scheme: dark)');

export function getPreferedColorScheme(): string {
	return pcs.matches ? 'dark' : 'light';
}

export function prefersColorSchemeSupported(): boolean {
	return not(pcs.media === 'not all');
}
