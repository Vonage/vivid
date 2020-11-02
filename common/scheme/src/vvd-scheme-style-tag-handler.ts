import { CSSResult } from 'lit-element';
import { preSchemeLoadingCssText } from './pre-scheme-loading.css.js';
import { PredefinedScheme } from './vvd-scheme.js';

type ModuleType =
	| typeof import('./scheme.dark.css')
	| typeof import('./scheme.light.css');

const getSchemeModule: (scheme: PredefinedScheme) => Promise<ModuleType> = (
	scheme: PredefinedScheme
) => {
	switch (scheme) {
		case 'dark':
			return import('./scheme.dark.css');
		case 'light':
		default:
			return import('./scheme.light.css');
	}
};

const STYLE_ELEMENT_CLASS = 'vvd-scheme-style';
const style = ensureStyleMount(STYLE_ELEMENT_CLASS);

function ensureStyleMount(sseClass: string): HTMLStyleElement {
	let result;
	const existing = document.querySelectorAll(`.${sseClass}`);
	if (existing.length) {
		console.error(
			`found ${existing.length} scheme styles upon init while expected for 1, check your dependencies configuration`
		);
		result = existing[0] as HTMLStyleElement;
	} else {
		result = document.createElement('style');
		result.className = STYLE_ELEMENT_CLASS;
		result.innerHTML = preSchemeLoadingCssText;
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
