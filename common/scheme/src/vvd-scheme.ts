import { CSSResult } from 'lit-element';
import { pipe } from 'ramda';
import { onSchemeChange } from './scheme-change-listener';
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

const style = mountStyle();

function mountStyle() {
  const style = document.createElement('style');
  style.type = 'text/css';
  document.head.appendChild(style);
  return style;
}

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

function updateStyleCssText(newCssText: CSSResult['cssText']) {
  style.innerHTML = newCssText || '';
}

async function syncWithOSSettings() {
  updateStyleCssText(
    await getSchemeCssText(getPreferedColorScheme() as SchemeOption)
  );
}

// TODO refactor this to an IIFE and remove any exposed API methods
// TODO identities need to be defined prior to initialization by a config
async function init(scheme?: SchemeOption) {
  // listen to selection change event
  onSchemeChange(async (scheme: SchemeOption) => {
    set(scheme);
  });
  return await set(scheme);
}

async function set(scheme: SchemeOption = schemeDefault()) {
  _selectedSchemeOption = scheme;
  let nextScheme: PredefinedScheme;

  if (scheme == 'syncWithOSSettings') {
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
  updateStyleCssText(await getSchemeCssText(nextScheme));
}

export default Object.freeze({
  init,
  set,
});

//TODO add the following tests:
//!scheme init with/without arguments
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
