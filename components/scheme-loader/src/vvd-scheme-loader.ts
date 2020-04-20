'use strict';

import { CSSResult } from 'lit-element';
import { pipe } from 'ramda';

const style = document.createElement('style');
style.type = 'text/css';
document.head.appendChild(style);

if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
  getSchemeModule('light');
} else {
  const autoSetScheme = pipe(getSchemeType, getSchemeModule, getStyleSheet, updateScheme);

  var pcs = window.matchMedia('(prefers-color-scheme: dark)');
  pcs.addListener(autoSetScheme);

  autoSetScheme();
}

type SchemeType = 'light' | 'dark';

function getSchemeType(): SchemeType {
  // return from storage first if exist
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

type ModuleType = typeof import('./scheme.dark.css') | typeof import('./scheme.light.css'); // This is the import type!

function getSchemeModule(schemeType: SchemeType) {
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

async function getStyleSheet(module: ModuleType) {
  return (await module).style;
}

async function updateScheme(resultPromise: Promise<CSSResult>) {
  const { cssText } = await resultPromise;
  style.innerHTML = cssText || '';
}
