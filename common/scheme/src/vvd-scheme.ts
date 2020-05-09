// 'use strict'; // Modules have strict mode enabled by default.

import { CSSResult } from 'lit-element';
import { pipe } from 'ramda';
import { onSchemeChange } from './scheme-change-listener';
import { pcs, getPreferedColorScheme, prefersColorSchemeSupported } from './os-sync.utils';

document.body.classList.add('scheme-loaded');

export type PredefinedScheme = 'light' | 'dark';
export type SchemeOption = 'syncWithOSSettings' | PredefinedScheme;
type ModuleType = typeof import('./scheme.dark.css') | typeof import('./scheme.light.css'); // This is the import type!

const getSchemeCssText = pipe(getSchemeModule, getStyleSheet, getCssText);

let _selectedScheme: PredefinedScheme;
export const getSelectedScheme = () => _selectedScheme;

let _selectedSchemeOption: SchemeOption;
export const getSelectedSchemeOption = () => _selectedSchemeOption;

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

// function getSchemeType(schemeType?: SchemeType): SchemeType {
//   // return from storage first if exist
//   return schemeType || getPreferedColorScheme();
// }

function getSchemeModule(schemeType: SchemeOption) {
  console.log(`set ${schemeType} scheme`);

  let module: Promise<ModuleType>;

  switch (schemeType) {
    case 'dark':
      module = import('./scheme.dark.css');
      break;
    case 'light':
    default:
      module = import('./scheme.light.css');
  }

  return module;
}

async function getStyleSheet(ModulePromise: Promise<ModuleType>) {
  return (await ModulePromise).style;
}

async function getCssText(resultPromise: Promise<CSSResult>): Promise<CSSResult['cssText']> {
  const { cssText } = await resultPromise;
  return cssText;
}

function updateStyleCssText(newCssText: CSSResult['cssText']) {
  style.innerHTML = newCssText || '';
}

async function syncWithOSSettings() {
  updateStyleCssText(await getSchemeCssText(getPreferedColorScheme()));
}

async function setScheme(scheme: SchemeOption = schemeDefault()) {
  _selectedSchemeOption = scheme;
  let nextScheme: PredefinedScheme;

  if (scheme == 'syncWithOSSettings') {
    // observe preference changes
    pcs.addListener(syncWithOSSettings);
    nextScheme = getPreferedColorScheme();
  } else {
    // stop observing preference changes
    pcs.removeListener(syncWithOSSettings);
    nextScheme = scheme;
  }
  if (_selectedScheme === nextScheme) {
    return;
  }
  _selectedScheme = nextScheme;
  updateStyleCssText(await getSchemeCssText(nextScheme));
}

export async function init(scheme?: SchemeOption) {
  // listen to selection change
  onSchemeChange(async (scheme: SchemeOption) => {
    setScheme(scheme);
  });
  setScheme(scheme);
}

//TODO add the following tests:
//!scheme init with/without arguments
//!scheme change event
//!add / remove Listener when toggling 'syncWithOSSettings' selected option
