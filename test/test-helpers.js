const tmpTemple = document.createElement('template');

export function isolatedElementsCreation() {
	function addElementToBeCleared(elementsToBeCleared) {
		elements.push.apply(elements, elementsToBeCleared);
		return elementsToBeCleared;
	}

	afterEach(function () {
		elements.forEach(elm => elm.remove());
		elements.length = 0;
	});
	const elements = [];
	return addElementToBeCleared;
}

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

	const styleKeys = Object.keys(expectedStyles);
	if (!expectedStyles || typeof expectedStyles !== 'object' || !styleKeys.length) {
		throw new Error(`'expectedStyles' MUST be a non-empty object, got ${JSON.stringify(expectedStyles)}`);
	}

	const computedStyle = getComputedStyle(element);
	for (const styleKey of styleKeys) {
		let actualValue, expectedValue;
		switch (styleKey) {
			case 'fontFamily':
				expectedValue = String(expectedStyles[styleKey]);
				actualValue = String(computedStyle[styleKey]).replaceAll('"', '');
				break;
			case 'fontSize':
				expectedValue = parseFloat(expectedStyles[styleKey]).toFixed(3);
				actualValue = parseFloat(computedStyle[styleKey]).toFixed(3);
				break;
			default:
				expectedValue = expectedStyles[styleKey];
				actualValue = computedStyle[styleKey];
		}
		if (actualValue !== expectedValue) {
			throw new Error(`'${styleKey}' is NOT as expected; expected: '${expectedValue}', found: '${actualValue}'`);
		}
	}
}