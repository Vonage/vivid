import { SchemeOption } from './vvd-scheme';
import { tryCatch } from 'ramda';
import { SCHEME_SELECT as eventName } from '@vonage/vwc-scheme-select/src';
// const SCHEME_SELECT: typeof eventName = 'vvd-scheme-select';

export function onSchemeChange(fn: (scheme: SchemeOption) => any): void {
  document.addEventListener(
    eventName,
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
