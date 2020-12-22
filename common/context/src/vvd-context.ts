import '@vonage/vvd-core';
import { CSSResult } from 'lit-element';

export default {
	install,
};

const CONTEXT_STYLE_CLASS_IDENTIFIER = 'vivid-context-style';
let STYLE_FETCHED_PROMISE: Promise<CSSResult>;

/**
 * installs Vivid context (styles) into the target scope / document
 * - target scope may by any `Document` or `DocumentFragment` (including `ShadowRoot`)
 * - default target (when not specified) is the document visible in the current scope
 * - the API is idempotent, the style/s will be installed only once, even if API called multiple times
 *
 * @param {Document | DocumentFragment} target - target document/shadow root to install the CSS into
 * @throws {Error} error - if the provided target argument is `null` or not a Node of type `Document` / `DocumentFragment`
 */
async function install(
	target: Document | DocumentFragment = document
): Promise<void> {
	if (
		!target ||
		(target.nodeType !== Node.DOCUMENT_NODE &&
			target.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)
	) {
		throw new Error(`target document expected; got ${target}`);
	}

	const styleElement = await obtainStyleElement(target);

	if (!styleElement.parentNode) {
		if (target.nodeType === Node.DOCUMENT_NODE) {
			(target as Document).head.appendChild(styleElement);
		} else {
			target.appendChild(styleElement);
		}
	}
}

async function obtainStyleElement(
	target: Document | DocumentFragment
): Promise<HTMLStyleElement> {
	let styleElement = target.querySelector(
		`.${CONTEXT_STYLE_CLASS_IDENTIFIER}`
	) as HTMLStyleElement;

	if (!styleElement) {
		const styleContent = await obtainStyleContent();
		styleElement = (target.ownerDocument ?? target).createElement('style');
		styleElement.className = CONTEXT_STYLE_CLASS_IDENTIFIER;
		styleElement.innerHTML = styleContent.cssText;
	}

	return styleElement;
}

async function obtainStyleContent(): Promise<CSSResult> {
	if (!STYLE_FETCHED_PROMISE) {
		STYLE_FETCHED_PROMISE = import('./vvd-context.css.js').then((d) => d.style);
	}
	return STYLE_FETCHED_PROMISE;
}
