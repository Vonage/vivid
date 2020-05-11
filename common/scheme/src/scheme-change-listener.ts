import { SchemeOption } from './vvd-scheme';
import { tryCatch } from 'ramda';
import { SCHEME_SELECT as eventName } from '../../../components/scheme-select';
const SCHEME_SELECT: typeof eventName = 'vvd-scheme-select';

export function onSchemeChange(fn: (scheme: SchemeOption) => any): void {
  document.addEventListener(
    SCHEME_SELECT,
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
