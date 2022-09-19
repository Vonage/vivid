import { applySchemeCSS } from './vvd-scheme-style-tag-handler.js';
import {
	pcs,
	getPreferedColorScheme,
	// prefersColorSchemeSupported,
} from './os-sync.utils.js';
import {
	PredefinedScheme,
	AutoScheme,
} from './vvd-scheme-foundation.js';

import type {
	SchemeOption,
	SelectedDetail
} from './vvd-scheme-foundation.js';
import { Emitter } from '@vonage/vvd-foundation/general-utils.js';

export {
	PredefinedScheme,
	AutoScheme,
} from './vvd-scheme-foundation.js';

export type {
	SchemeOption,
	SelectedDetail
};

const eventBus = new Emitter(); // !refactored due to lack of support of EventTarget as a constructor (new EventTarget()) in safari 12

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
	return PredefinedScheme.LIGHT;
}

function getEffectiveSchemeOption(
	destOption: SchemeOption | null = null
): SchemeOption {
	return destOption || _selectedSchemeOption || getDefaultSchemeOption();
}

async function syncWithOSSettings() {
	applySchemeCSS(getPreferedColorScheme() as PredefinedScheme);
}

function setSyncModeIfRelevant(scheme: SchemeOption): PredefinedScheme {
	let result: SchemeOption;
	if (scheme === AutoScheme.SYNC_WITH_OS_SETTINGS) {
		pcs.addEventListener('change', syncWithOSSettings);
		result = getPreferedColorScheme() as PredefinedScheme;
	} else {
		pcs.removeEventListener('change', syncWithOSSettings);
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
		notifySelected(_selectedScheme);

		return {
			option: _selectedSchemeOption,
			scheme: _selectedScheme,
		};
	});

	return setPromise;
}

function notifySelected(scheme: SchemeOption) {
	const ev = new CustomEvent<SelectedDetail>('vvd-scheme-select', {
		detail: { scheme },
	});
	eventBus.dispatchEvent(ev);
}

/**
 * @fires selected {SelectedDetail}
 */
export default Object.freeze({
	set,
	eventBus,
	getSelectedScheme,
	getSelectedSchemeOption,
});

//TODO add the following tests:
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
