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

function getEffectiveSchemeOption(
	destOption: SchemeOption | null = null
): SchemeOption {
	return destOption
		? destOption
		: _selectedSchemeOption
		? _selectedSchemeOption
		: getDefaultSchemeOption();
}

async function syncWithOSSettings() {
	applySchemeCSS(getPreferedColorScheme() as PredefinedScheme);
}

function init(): void {
	onSchemeChange(async (scheme: SchemeOption) => {
		set(scheme);
	});
}

function setSyncModeIfRelevant(scheme: SchemeOption): PredefinedScheme {
	let result: SchemeOption;
	if (scheme === 'syncWithOSSettings') {
		pcs.addListener(syncWithOSSettings);
		result = getPreferedColorScheme() as PredefinedScheme;
	} else {
		pcs.removeListener(syncWithOSSettings);
		result = scheme;
	}
	return result;
}

let setPromise: Promise<Record<string, unknown>> | null = null;
async function set(
	schemeOption: SchemeOption | null = null
): Promise<Record<string, unknown>> {
	console.debug(`Vivid scheme requested to change to '${schemeOption}'...`);

	const effectiveOption = getEffectiveSchemeOption(schemeOption);
	console.debug(`... which resolved effectively to '${effectiveOption}'...`);

	if (effectiveOption === _selectedSchemeOption && setPromise) {
		console.debug('... new scheme option is equal to current, done');
		return setPromise;
	}

	_selectedSchemeOption = effectiveOption;

	let tmpPromise;
	const effectiveNewScheme: PredefinedScheme = setSyncModeIfRelevant(
		_selectedSchemeOption
	);
	if (effectiveNewScheme !== _selectedScheme) {
		_selectedScheme = effectiveNewScheme;
		tmpPromise = applySchemeCSS(_selectedScheme);
	} else {
		tmpPromise = Promise.resolve();
	}

	setPromise = tmpPromise.then(() => {
		console.debug('... scheme changed');
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
