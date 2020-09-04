import { SchemeOption } from './vvd-scheme.js';
import { tryCatch } from 'ramda';

export const SCHEME_SELECT_EVENT_TYPE = 'vvd_scheme_select';

function tryCatchHandler(
  callback: (scheme: SchemeOption) => void,
  scheme: SchemeOption
) {
  return tryCatch(
    () => {
      callback(scheme);
    },
    (err) => {
      throw new Error(err);
    }
  );
}

// BroadcastChannel API currently not supported in safari
const broadCastFn = (callback: (scheme: SchemeOption) => void) =>
  (new BroadcastChannel(SCHEME_SELECT_EVENT_TYPE).onmessage = ({
    data: scheme,
  }) => {
    tryCatchHandler(callback, scheme)();
  });

// plain eventListener fallback
const eventListenerFn = (callback: (scheme: SchemeOption) => void) =>
  document.addEventListener(
    SCHEME_SELECT_EVENT_TYPE,
    (e) => {
      const { scheme } = (e as CustomEvent)?.detail;
      tryCatchHandler(callback, scheme)();
    },
    false
  );

export function onSchemeChange(callback: (scheme: SchemeOption) => void): void {
  !globalThis.BroadcastChannel
    ? broadCastFn(callback)
    : eventListenerFn(callback);
}
