export { getTypographyStyle } from './typography-utils.js';
export {
	assertComputedStyle,
	assertDistancePixels,
	listenToSubmission,
	changeValueAndNotify,
	isolatedElementsCreation,
	textToDocumentFragment,
	textToDomToParent,
	waitNextTask,
	waitInterval,
	randomAlpha,
	isSafari,
	isFirefox,
	getFrameLoadedInjected,
	cleanFrame,
	getRandom,
}

const tmpTemple = document.createElement('template');

function listenToSubmission(formElement) {
	return new Promise((res) => {
		formElement.addEventListener('submit', () => {
			const formData = new FormData(formElement);
			res(formData);
		});
	});
}

async function changeValueAndNotify(
	actualElement,
	value,
	eventName = 'change'
) {
	actualElement.value = value;
	await waitNextTask();

	actualElement.dispatchEvent(new Event(eventName));
}

function isolatedElementsCreation() {
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

function textToDocumentFragment(html) {
	if (!html) {
		throw new Error(`html parameter MUST NOT be NULL nor EMPTY, got ${html}`);
	}
	tmpTemple.innerHTML = html;
	const result = tmpTemple.content.cloneNode(true);
	tmpTemple.innerHTML = '';
	return result;
}

function textToDomToParent(html, parentNode = document.body) {
	const documentFragment = textToDocumentFragment(html);
	const result = Array.from(documentFragment.children);
	parentNode.appendChild(documentFragment);
	return result;
}

async function waitNextTask() {
	return new Promise(resolve => setTimeout(resolve));
}

async function waitInterval(millis) {
	await new Promise(resolve => setTimeout(resolve, millis));
}

const ALPHA_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function randomAlpha(length = 8) {
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
	letterSpacingSemanticMap = {
		normal: 0
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

function assertComputedStyle(element, expectedStyles, pseudoSelector = null) {
	if (!element) {
		throw new Error(`'element' parameter MUST be a valid element, got ${element}`);
	}

	const styleKeys = Object.keys(expectedStyles);
	if (!expectedStyles || typeof expectedStyles !== 'object' || !styleKeys.length) {
		throw new Error(`'expectedStyles' MUST be a non-empty object, got ${JSON.stringify(expectedStyles)}`);
	}

	const computedStyle = getComputedStyle(element, pseudoSelector);
	if (!computedStyle) {
		throw new Error(`failed to retrieve computed style of ${element}${pseudoSelector ? ` (${pseudoSelector})` : ''}`);
	}

	for (const styleKey of styleKeys) {
		let actualValue, expectedValue;
		switch (styleKey) {
			//	color transformers
			case 'color':
			case 'backgroundColor':
			case 'borderColor':
			case 'borderTopColor':
			case 'borderRightColor':
			case 'borderBottomColor':
			case 'borderLeftColor':
			case 'borderInlineStartColor':
			case 'borderInlineEndColor':
			case 'borderBlockStartColor':
			case 'borderBlockEndColor':
			case 'stroke':
				actualValue = computedStyle[styleKey].replaceAll(/\s/g, '');
				expectedValue = expectedStyles[styleKey].replaceAll(/\s/g, '');
				break;

			//	typography transformers
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
				actualValue = parseFloat(computedStyle[styleKey]);
				if (isNaN(actualValue)) {
					actualValue = letterSpacingSemanticMap[computedStyle[styleKey]].toFixed(3);
				}
				expectedValue = parseFloat(expectedStyles[styleKey]).toFixed(3);
				break;
			case 'lineHeight':
				actualValue = parseFloat(computedStyle[styleKey]);
				if (isNaN(actualValue)) {
					expectedValue = 'normal';
					actualValue = computedStyle[styleKey];
				} else {
					expectedValue = parseFloat(expectedStyles[styleKey]).toFixed(1);
					actualValue = parseFloat(computedStyle[styleKey]).toFixed(1);
				}
				break;
			case 'textDecoration':
				actualValue = computedStyle[styleKey]
					.split(/\s/)
					.reduce((r, v) => v === expectedValue ? v : r, undefined);
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

function assertDistancePixels(e1, e2, property, expected) {
	const cr1 = e1.getBoundingClientRect();
	const cr2 = e2.getBoundingClientRect();
	const actual = Math.abs(cr1[property] - cr2[property]);
	if (actual !== expected) {
		throw new Error(`expected distance between '${property}' to be ${expected}, found ${actual}`);
	}
}

function isSafari() {
	return window.navigator.userAgent.toLowerCase().includes('safari') &&
		!window.navigator.userAgent.toLowerCase().includes('chrome');
}

function isFirefox() {
	return window.navigator.userAgent.toLowerCase().includes('firefox');
}

/**
 * creates iFrame with the specified HTML (via karmaHTML framework)
 * waits until the iFrame is loaded
 * executes testCode on the iFrame's window object
 * resolves as soon as all of those operations done
 *
 * @param {string} htmlTag
 * @param {function} testCode logic to run on the contentWindow of the newly created iframe
 * @returns created and initialised iFrame element
 */
async function getFrameLoadedInjected(htmlTag, testCode) {
	if (!htmlTag || typeof htmlTag !== 'string') {
		throw new Error(`htmlTag MUST be a non-null nor-empty string, got '${htmlTag}'`);
	}
	if (!testCode && typeof testCode !== 'function') {
		throw new Error(`test code MUST be a function`);
	}

	const loader = karmaHTML[htmlTag];
	loader.reload();
	return new Promise((resolve, reject) => {
		loader.onstatechange = ready => {
			if (!ready) { return; }
			const result = loader.iframe;

			//	test logic
			Promise
				.resolve(testCode.call(result.contentWindow, result))
				.catch(reject)
				.finally(() => resolve(result));
		};
	});
}

function cleanFrame(htmlTag) {
	karmaHTML[htmlTag].close();
}

function getRandom() {
	return crypto.getRandomValues(new Uint8Array(1))[0] / 256;
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