import type { CSSResult } from 'lit-element';
import { PredefinedScheme } from './vvd-scheme-foundation.js';

type ModuleType =
	| typeof import('./scheme.dark.css.js')
	| typeof import('./scheme.light.css.js');

const getSchemeModule: (scheme: PredefinedScheme) => Promise<ModuleType> = (
	scheme: PredefinedScheme
) => {
	switch (scheme) {
	case PredefinedScheme.DARK:
		return import('./scheme.dark.css.js');
	case PredefinedScheme.LIGHT:
	default:
		return import('./scheme.light.css.js');
	}
};

const STYLE_ELEMENT_CLASS = 'vvd-scheme-style';
const style = ensureStyleMount(STYLE_ELEMENT_CLASS);

function ensureStyleMount(schemeStylesheetClass: string): HTMLStyleElement {
	let result;
	const existing = document.querySelectorAll(`.${schemeStylesheetClass}`);
	if (existing.length) {
		console.error(
			`found ${existing.length} scheme styles upon init while expected for 1, check your dependencies configuration`
		);
		result = existing[0] as HTMLStyleElement;
	} else {
		result = document.createElement('style');
		result.className = STYLE_ELEMENT_CLASS;
		document.head.appendChild(result);
	}
	return result;
}

export async function applySchemeCSS(scheme: PredefinedScheme): Promise<void> {
	const schemeModule = await getSchemeModule(scheme);

	const cssResult: CSSResult | undefined = schemeModule?.style;
	if (cssResult) {
		style.innerHTML = cssResult.cssText || '';
	}
}
