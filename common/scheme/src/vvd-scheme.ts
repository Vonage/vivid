import { onSchemeChange } from './scheme-change-listener';
import { applySchemeCSS } from './vvd-scheme-style-tag-handler';

import {
	pcs,
	getPreferedColorScheme,
	// prefersColorSchemeSupported,
} from './os-sync.utils';
import { ReplaySubject } from 'rxjs';

export type PredefinedScheme = 'light' | 'dark';
export type SchemeOption = 'syncWithOSSettings' | PredefinedScheme;

const changeSubject: ReplaySubject<SchemeOption> = new ReplaySubject();

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
	// return prefersColorSchemeSupported() ? 'syncWithOSSettings' : 'light';
	// ! commented the cahnce of serving dark mode components as:
	// ! 1. vivid packages aren't really supported by dark mode yet
	// ! 2. we still have no control over application scheme mode context
	return 'light';
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
	// console.info(`Vivid scheme requested to change to '${schemeOption}'...`);

	const effectiveOption = getEffectiveSchemeOption(schemeOption);
	// console.info(`... which resolved effectively to '${effectiveOption}'...`);

	if (effectiveOption === _selectedSchemeOption && setPromise) {
		// console.info('... new scheme option is equal to current, done');
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
		// console.info('... scheme changed');
		changeSubject.next(_selectedScheme);
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
	valueChanges() {
		return changeSubject.asObservable();
	},
});

init();

//TODO add the following tests:
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
