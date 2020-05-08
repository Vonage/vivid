import { SCHEME_SELECTION } from '@vonage/vwc-scheme-select';
import { SchemeType } from './vvd-scheme';
import { tryCatch } from 'ramda';

export function onUserSelect(fn: (schemeType: SchemeType) => any): void {
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
