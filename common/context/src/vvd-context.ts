import '@vonage/vvd-core';
import { style } from './vvd-context.css';

init();

function init(): void {
	injectGlobalStyle();
}

function injectGlobalStyle() {
	const globalStyleSheet = document.createElement('style');
	globalStyleSheet.innerHTML = style.cssText;
	document.head.appendChild(globalStyleSheet);
}
