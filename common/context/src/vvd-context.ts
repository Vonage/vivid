import '@vonage/vvd-core';

export default {
	install,
};

const CONTEXT_STYLE_IDENTIFIER = 'vivid-context-style';

/**
 * installs Vivid context (styles) into the target scope
 */
async function install(target = document): Promise<void> {
	if (
		!target ||
		(target.nodeType !== Node.DOCUMENT_NODE &&
			target.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)
	) {
		throw new Error(`target document expected; got ${target}`);
	}

	const { style } = await import('./vvd-context.css');

	let styleElement = target.querySelector(`.${CONTEXT_STYLE_IDENTIFIER}`);
	if (!styleElement) {
		styleElement = (target.ownerDocument ?? target).createElement('style');
	}

	styleElement.innerHTML = style.cssText;
	(target.head || target).appendChild(styleElement);
}
