import { Scheme } from './vwc-theme-types';

const prefersSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

const isPrefersColorSchemeSupported = prefersSchemeDark.media !== 'not all';

export function getPreferedColorScheme(): Scheme {
	return isPrefersColorSchemeSupported && prefersSchemeDark.matches ? Scheme.DARK : Scheme.LIGHT;
}


