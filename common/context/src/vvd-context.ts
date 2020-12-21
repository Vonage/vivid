import '@vonage/vvd-core';
import { CSSResult } from 'lit-element';

export default {
	install,
};

const CONTEXT_STYLE_IDENTIFIER = 'vivid-context-style';
let STYLE_FETCHED_PROMISE: Promise<CSSResult>;

/**
 * installs Vivid context (styles) into the target scope
 * - the API is idempotent, the style will install the CSS only once, ensuring that the style is not already exists
 * - default target will be the document visible in the current scope
 *
 * @param {Document | ShadowRoot} target - target document/shadow root to install the CSS into
 */
async function install(
	target: Document | ShadowRoot = document
): Promise<void> {
	if (
		!target ||
		(target.nodeType !== Node.DOCUMENT_NODE &&
			target.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)
	) {
		throw new Error(`target document expected; got ${target}`);
	}

	const style = await obtainStyleContent();

	let styleElement = target.querySelector(`.${CONTEXT_STYLE_IDENTIFIER}`);
	if (!styleElement) {
		styleElement = (target.ownerDocument ?? target).createElement('style');
	}

	styleElement.innerHTML = style.cssText;
	target.appendChild(styleElement);
}

async function obtainStyleContent() {
	if (!STYLE_FETCHED_PROMISE) {
		STYLE_FETCHED_PROMISE = import('./vvd-context.css').then(
			({ style }) => style
		);
	}
	return STYLE_FETCHED_PROMISE;
}
