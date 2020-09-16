import { onSchemeChange } from './scheme-change-listener';
import { applySchemeCSS } from './vvd-scheme-style-tag-handler';

import {
	pcs,
	getPreferedColorScheme,
	prefersColorSchemeSupported,
} from './os-sync.utils';

export type PredefinedScheme = 'light' | 'dark';
export type SchemeOption = 'syncWithOSSettings' | PredefinedScheme;

let _selectedScheme: PredefinedScheme;
function getSelectedScheme(): PredefinedScheme {
	return _selectedScheme;
}

let _selectedSchemeOption: SchemeOption;
function getSelectedSchemeOption(): SchemeOption {
	return _selectedSchemeOption;
}

function getDefaultSchemeOption(): SchemeOption {
	// if no scheme chosen try 'prefers-color-scheme' and if not supported just return 'light'
	return prefersColorSchemeSupported() ? 'syncWithOSSettings' : 'light';
}

async function syncWithOSSettings() {
	applySchemeCSS(getPreferedColorScheme() as PredefinedScheme);
}

function init(): void {
	onSchemeChange(async (scheme: SchemeOption) => {
		set(scheme);
	});
}

let setPromise: Promise<Record<string, unknown>> | null = null;
async function set(
	schemeOption: SchemeOption | null = null
): Promise<Record<string, unknown>> {
	console.log(`Vivid scheme requested to change to '${schemeOption}'...`);

	const effectiveOption = schemeOption
		? schemeOption
		: _selectedSchemeOption
		? _selectedSchemeOption
		: getDefaultSchemeOption();

	console.log(`... which resolved effectively to '${effectiveOption}'...`);
	if (effectiveOption === _selectedSchemeOption && setPromise) {
		console.log('... new scheme option equal to current, done');
		return setPromise;
	}

	_selectedSchemeOption = effectiveOption;
	let effectiveNewScheme: PredefinedScheme;

	if (_selectedSchemeOption === 'syncWithOSSettings') {
		pcs.addEventListener('change', syncWithOSSettings);
		effectiveNewScheme = getPreferedColorScheme() as PredefinedScheme;
	} else {
		pcs.removeEventListener('change', syncWithOSSettings);
		effectiveNewScheme = _selectedSchemeOption;
	}

	let tmpPromise;
	if (effectiveNewScheme !== _selectedScheme) {
		_selectedScheme = effectiveNewScheme;
		tmpPromise = applySchemeCSS(effectiveNewScheme);
	} else {
		tmpPromise = Promise.resolve();
	}

	setPromise = tmpPromise.then(() => {
		console.log('... scheme changed');
		return {
			option: _selectedSchemeOption,
			scheme: _selectedScheme,
		};
	});

	return setPromise;
}

export default Object.freeze({
	set,
	getSelectedScheme,
	getSelectedSchemeOption,
});

init();

//TODO add the following tests:
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
