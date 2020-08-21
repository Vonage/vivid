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

export function assertComputedStyle(element, expectedStyles) {
	if (!element) {
		throw new Error(`'element' parameter MUST be a valid element, got ${element}`);
	}

	const styleKeys = Object.keys(expectedStyles);
	if (!expectedStyles || typeof expectedStyles !== 'object' || !styleKeys.length) {
		throw new Error(`'expectedStyles' MUST be a non-empty object, got ${JSON.stringify(expectedStyles)}`);
	}

	const computedStyle = getComputedStyle(element);
	for (const styleKey of styleKeys) {
		if (computedStyle[styleKey] !== expectedStyles[styleKey]) {
			throw new Error(`'${styleKey}' is NOT as expected; expected: '${expectedStyles[styleKey]}', found: '${computedStyle[styleKey]}'`);
		}
	}
}