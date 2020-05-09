import { SchemeOption } from './vvd-scheme';
import { tryCatch } from 'ramda';

export const SCHEME_SELECTION = 'vvd-scheme-selection';

export function onSchemeChange(fn: (schemeType: SchemeOption) => any): void {
  document.addEventListener(
    SCHEME_SELECTION,
    e => {
      tryCatch(
        () => {
          const { schemeType } = (e as CustomEvent)?.detail;
          fn(schemeType);
        },
        err => {
          throw new Error(err);
        },
      )();
    },
    false,
  );
}
