import { CSSResult } from 'lit-element';
import { preSchemeLoadingCssText } from './pre-scheme-loading.css.js';
import { PredefinedScheme } from './vvd-scheme.js';

type ModuleType =
	| typeof import('./scheme.dark.css')
	| typeof import('./scheme.light.css');

export async function applySchemeCSS(scheme: PredefinedScheme): Promise<void> {
	const cssResult: CSSResult = (await getSchemeModule(scheme)).style;
	style.innerHTML = cssResult.cssText || '';
}

//	private area
//
const style = mountStyle();

function mountStyle() {
	const style = document.createElement('style');
	style.innerHTML = preSchemeLoadingCssText;
	document.head.appendChild(style);
	return style;
}

async function getSchemeModule(
	schemeOption: PredefinedScheme
): Promise<ModuleType> {
	switch (schemeOption) {
		case 'dark':
			return import('./scheme.dark.css');
		case 'light':
		default:
			return import('./scheme.light.css');
	}
}
