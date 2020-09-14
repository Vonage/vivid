import { CSSResult } from 'lit-element';
import { preSchemeLoadingCssText } from './pre-scheme-loading.css.js';

const style = mountStyle();

function mountStyle() {
  const style = document.createElement('style');
  style.innerHTML = preSchemeLoadingCssText;
  document.head.appendChild(style);
  return style;
}

export function updateTagStyleCssText(newCssText: CSSResult['cssText']): void {
  style.innerHTML = newCssText || '';
}
