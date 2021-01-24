import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import {
	isolatedElementsCreation,
	isSafari,
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers';
import '@vonage/vwc-textarea';
import '@vonage/vwc-textfield';

const vwcElementsSupported = [
	'vwc-checkbox',
	'vwc-radio',
	'vwc-select',
	'vwc-slider',
	'vwc-switch',
	'vwc-textarea',
	'vwc-textfield',
];

describe('autofocus', () => {
	let addElement = isolatedElementsCreation();

	it('should NOT throw on invalid input (no argument)', async () => {
		handleAutofocus();
	});

	it('should NOT throw on invalid input (null)', async () => {
		handleAutofocus(null);
	});

	it('should NOT throw on invalid input (string)', async () => {
		handleAutofocus('some');
	});

	vwcElementsSupported.forEach((vwcElement) => {
		describe(`autofocus behaviour of '${vwcElement}'`, () => {
			it('should focus on target if no other element focused', async () => {
				if (isSafari()) {
					return;
				}
				clearAnyFocus();

				const [e] = addElement(
					textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`)
				);
				await waitNextTask();

				assertFocusStatus(e, true);
			});

			it('should NOT "steal" focus from already focused element if any', async () => {
				const [input] = addElement(textToDomToParent('<input/>'));
				input.focus();

				const [e] = addElement(
					textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`)
				);
				await waitNextTask();

				assertFocusStatus(e, false);
				input.blur();
				input.remove();
				document.body.blur();
			});

			it('should NOT focus when "autofocus" not specified', async () => {
				clearAnyFocus();

				const [e] = addElement(
					textToDomToParent(`<${vwcElement}></${vwcElement}>`)
				);
				await waitNextTask();

				assertFocusStatus(e, false);
				e.remove();
			});
		});
	});
});

function clearAnyFocus() {
	document.activeElement?.blur();
}

function assertFocusStatus(vividInput, status) {
	expect(vividInput.matches(':focus-within')).equal(status);
	if (vividInput.nodeName.toLowerCase() === 'vwc-select') {
		return;
	}

	let inputToValidate;
	if (vividInput.nodeName.toLowerCase() === 'vwc-textfield') {
		inputToValidate = vividInput.querySelector('input');
	} else {
		inputToValidate = vividInput.shadowRoot.querySelector(
			'input, textarea, .mdc-slider'
		);
	}

	expect(inputToValidate.matches(':focus')).equal(status);
}
