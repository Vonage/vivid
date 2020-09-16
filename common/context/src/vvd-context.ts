import { coreReady } from '@vonage/vvd-core';
import { style } from './vvd-context.css';

let initResolver: (value?: unknown) => void | PromiseLike<void>,
	initRejector: (reason?: unknown) => void | PromiseLike<void>;

export const contextReady = new Promise((resolve, reject) => {
	initResolver = resolve;
	initRejector = reject;
});

init();

async function init(): Promise<void> {
	try {
		injectGlobalStyle();
		await coreReady;
		initResolver();
	} catch (e) {
		initRejector(e);
	}
}

function injectGlobalStyle() {
	const globalStyleSheet = document.createElement('style');
	globalStyleSheet.type = 'text/css';
	globalStyleSheet.innerHTML = style.cssText;
	document.head.appendChild(globalStyleSheet);
}
