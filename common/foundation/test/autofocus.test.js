import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import {
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

describe.only('autofocus', () => {
	it('should NOT throw on invalid input', async () => {
		handleAutofocus();
		handleAutofocus(null);
		handleAutofocus('some');
	});

	vwcElementsSupported.forEach((vwcElement) => {
		describe(`autofocus behaviour of '${vwcElement}'`, () => {
			it('should focus on target if no other element focused', async () => {
				if (isSafari()) {
					return;
				}
				clearAnyFocus();

				const [e] = textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`);
				await waitNextTask();

				assertFocusStatus(e, true);
				e.remove();
			});

			it('should NOT "steal" focus from already focused element if any', async () => {
				const [input] = textToDomToParent('<input/>');
				input.focus();

				const [e] = textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`);
				await waitNextTask();

				assertFocusStatus(e, false);
				e.remove();
				input.blur();
				input.remove();
				document.body.blur();
			});

			it('should NOT focus when "autofocus" not specified', async () => {
				clearAnyFocus();

				const [e] = textToDomToParent(`<${vwcElement}></${vwcElement}>`);
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
