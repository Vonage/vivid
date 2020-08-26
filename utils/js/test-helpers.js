const tmpTemple = document.createElement('template');

export function textToDocumentFragment(html) {
	if (!html) {
		throw new Error(`html parameter MUST NOT be NULL nor EMPTY, got ${html}`);
	}
	tmpTemple.innerHTML = html;
	const result = tmpTemple.content.cloneNode(true);
	tmpTemple.innerHTML = '';
	return result;
}

export function textToDomToParent(html, parentNode = document.body) {
	const documentFragment = textToDocumentFragment(html);
	const result = Array.from(documentFragment.children);
	parentNode.appendChild(documentFragment);
	return result;
}

export async function waitNextTask() {
	return new Promise(resolve => setTimeout(resolve));
}

export async function waitInterval(millis) {
	await new Promise(resolve => setTimeout(resolve, millis));
}

const ALPHA_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function randomAlpha(length = 8) {
	if (!length || length < 0 || typeof length !== 'number') {
		throw new Error(`unexpected length type '${typeof length}'`);
	}

	const srcLen = ALPHA_CHARSET.length;
	return Array.from(crypto.getRandomValues(new Uint8Array(length)))
		.map(rv => ALPHA_CHARSET.charAt(srcLen * rv / 256))
		.join('');
}

export function assertComputedStyle(element, expectedStyles) {
	if (!element) {
		throw new Error(`'element' parameter MUST be a valid element, got ${element}`);
	}
	if (!expectedStyles || typeof expectedStyles !== 'object' || !Object.keys(expectedStyles)) {
		throw new Error(`'expectedStyles' MUST be a non-empty object, got ${JSON.stringify(expectedStyles)}`);
	}
	const computedStyle = getComputedStyle(element);
	Object.keys(expectedStyles).forEach(key => {
		if (computedStyle[key] !== expectedStyles[key]) {
			throw new Error(`'${key}' is NOT as expected; expected: '${expectedStyles[key]}', found: '${computedStyle[key]}'`);
		}
	});
}