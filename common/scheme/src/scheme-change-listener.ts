import { SchemeOption } from './vvd-scheme.js';
import { tryCatch } from 'ramda';

export const SCHEME_SELECT_EVENT_TYPE = 'vvdschemeselect';

export function onSchemeChange(fn: (scheme: SchemeOption) => void): void {
  document.addEventListener(
    SCHEME_SELECT_EVENT_TYPE,
    e => {
      tryCatch(
        () => {
          const { scheme } = (e as CustomEvent)?.detail;
          fn(scheme);
        },
        err => {
          throw new Error(err);
        },
      )();
    },
    false,
  );
}
