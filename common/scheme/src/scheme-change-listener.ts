import { SchemeOption } from './vvd-scheme.js';

export const SCHEME_SELECT_EVENT_TYPE = 'vvd_scheme_select';

// BroadcastChannel API currently not supported in safari
const broadCastFn = (callback: (scheme: SchemeOption) => void) =>
	(new BroadcastChannel(SCHEME_SELECT_EVENT_TYPE).onmessage = ({
		data: scheme,
	}) => {
		callback(scheme);
	});

// plain eventListener fallback
const eventListenerFn = (callback: (scheme: SchemeOption) => void) =>
	document.addEventListener(
		SCHEME_SELECT_EVENT_TYPE,
		(e) => {
			const { scheme } = (e as CustomEvent)?.detail;
			callback(scheme);
		},
		false
	);

export function onSchemeChange(callback: (scheme: SchemeOption) => void): void {
	globalThis.BroadcastChannel
		? broadCastFn(callback)
		: eventListenerFn(callback);
}
