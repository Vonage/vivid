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

const style = mountStyle();

function mountStyle() {
	const styleElement = document.createElement('style');
	styleElement.innerHTML = preSchemeLoadingCssText;
	document.head.appendChild(styleElement);
	return styleElement;
}

export async function applySchemeCSS(scheme: PredefinedScheme): Promise<void> {
	const schemeModule = await getSchemeModule(scheme);

	const cssResult: CSSResult | undefined = schemeModule?.style;
	if (cssResult) {
		style.innerHTML = cssResult.cssText || '';
	}
}
