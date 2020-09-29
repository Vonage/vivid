import { CSSResult } from 'lit-element';
import { preSchemeLoadingCssText } from './pre-scheme-loading.css.js';
import { PredefinedScheme } from './vvd-scheme.js';

type ModuleType =
	| typeof import('./scheme.dark.css')
	| typeof import('./scheme.light.css');

const importSchemeMap = new Map<PredefinedScheme, Promise<ModuleType>>([
	['dark', import('./scheme.dark.css')],
	['light', import('./scheme.light.css')],
]);

const style = mountStyle();

function mountStyle() {
	const style = document.createElement('style');
	style.innerHTML = preSchemeLoadingCssText;
	document.head.appendChild(style);
	return style;
}

export async function applySchemeCSS(scheme: PredefinedScheme): Promise<void> {
	if (!importSchemeMap.has(scheme)) {
		throw new Error('scheme not found');
	}
	const schemeModule = await importSchemeMap.get(scheme);
	const cssResult: CSSResult | undefined = schemeModule?.style;
	if (cssResult) {
		style.innerHTML = cssResult.cssText || '';
	}
}
