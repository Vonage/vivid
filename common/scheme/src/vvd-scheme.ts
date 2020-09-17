import { CSSResult } from 'lit-element';
import { pipe } from 'ramda';
import { onSchemeChange } from './scheme-change-listener';
import { updateTagStyleCssText } from './vvd-scheme-style-tag-handler';

import {
	pcs,
	getPreferedColorScheme,
	prefersColorSchemeSupported,
} from './os-sync.utils';

export type PredefinedScheme = 'light' | 'dark';
export type SchemeOption = 'syncWithOSSettings' | PredefinedScheme;

type ModuleType =
	| typeof import('./scheme.dark.css')
	| typeof import('./scheme.light.css'); // This is the import type!

const getSchemeCssText = pipe(getSchemeModule, getStyleSheet, getCssText);

let _selectedScheme: PredefinedScheme;
export const getSelectedScheme = (): PredefinedScheme => _selectedScheme;

let _selectedSchemeOption: SchemeOption;
export const getSelectedSchemeOption = (): SchemeOption =>
	_selectedSchemeOption;

function schemeDefault(): SchemeOption {
	// if no scheme chosen try 'prefers-color-scheme' and if not supported just return 'light
	return prefersColorSchemeSupported() ? 'syncWithOSSettings' : 'light';
}

function getSchemeModule(schemeOption: SchemeOption): Promise<ModuleType> {
	switch (schemeOption) {
		case 'dark':
			return import('./scheme.dark.css');
		case 'light':
		default:
			return import('./scheme.light.css');
	}
}

async function getStyleSheet(ModulePromise: Promise<ModuleType>) {
	return (await ModulePromise).style;
}

async function getCssText(
	resultPromise: Promise<CSSResult>
): Promise<CSSResult['cssText']> {
	const { cssText } = await resultPromise;
	return cssText;
}

async function syncWithOSSettings() {
	updateTagStyleCssText(
		await getSchemeCssText(getPreferedColorScheme() as SchemeOption)
	);
}

function init(): void {
	onSchemeChange(async (scheme: SchemeOption) => {
		set(scheme);
	});
}

async function set(scheme: SchemeOption = schemeDefault()) {
	console.log(`Vivid scheme requested to change to '${scheme}'...`);

	if (_selectedSchemeOption !== scheme) {
		_selectedSchemeOption = scheme;
		let nextScheme: PredefinedScheme;

		if (scheme === 'syncWithOSSettings') {
			pcs.addEventListener('change', syncWithOSSettings);
			nextScheme = getPreferedColorScheme() as PredefinedScheme;
		} else {
			pcs.removeEventListener('change', syncWithOSSettings);
			nextScheme = scheme;
		}
		if (_selectedScheme === nextScheme) {
			return;
		}
		_selectedScheme = nextScheme;
		updateTagStyleCssText(await getSchemeCssText(nextScheme));
	} else {
		console.log(
			`You have tried to select the ${scheme} theme sync mode but it was already in effect.`
		);
	}

	console.log('... scheme change done');
}

export default Object.freeze({
	set,
});

init();

//TODO add the following tests:
//!scheme init with/without arguments
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
