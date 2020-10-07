const tmpTemple = document.createElement('template');

export function listenToSubmission(formElement) {
	return new Promise((res) => {
		formElement.addEventListener('submit', () => {
			const formData = new FormData(formElement);
			res(formData);
		});
	});
}

export async function changeValueAndNotify(
	actualElement,
	value,
	eventName = 'change'
) {
	actualElement.value = value;
	await waitNextTask();

	actualElement.dispatchEvent(new Event(eventName));
}

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

const
	fontWeightSemanticMap = {
		normal: 400,
		bold: 700
	},
	fontStretchSemanticMap = {
		'ultra-condensed': 50,
		'extra-condensed': 62.5,
		'condensed': 75,
		'semi-condensed': 87.5,
		'normal': 100,
		'semi-expanded': 112.5,
		'expanded': 125,
		'extra-expanded': 150,
		'ultra-expanded': 200
	};

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
			case 'fontStretch':
				actualValue = parseFloat(computedStyle[styleKey]);
				if (isNaN(actualValue)) {
					actualValue = fontStretchSemanticMap[computedStyle[styleKey]];
				}
				expectedValue = parseFloat(expectedStyles[styleKey]);
				break;
			case 'fontWeight':
				actualValue = parseInt(computedStyle[styleKey]);
				if (isNaN(actualValue)) {
					actualValue = fontWeightSemanticMap[computedStyle[styleKey]];
				}
				expectedValue = parseInt(expectedStyles[styleKey]);
				break;
			case 'letterSpacing':
				expectedValue = parseFloat(expectedStyles[styleKey]).toFixed(3);
				actualValue = parseFloat(computedStyle[styleKey]).toFixed(3);
				break;
			case 'lineHeight':
				expectedValue = parseFloat(expectedStyles[styleKey]).toFixed(1);
				actualValue = parseFloat(computedStyle[styleKey]).toFixed(1);
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

class TestComponent extends HTMLElement {
	connectedCallback() {
		this.attachShadow({ mode: 'open' });
	}

	setContent(htmlString) {
		this.shadowRoot.innerHTML = htmlString;
	}
}

window.customElements.define('vivid-tests-component', TestComponent);