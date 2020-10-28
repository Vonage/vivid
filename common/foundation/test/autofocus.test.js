import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import { textToDomToParent, waitNextTask } from '../../../test/test-helpers';
import '@vonage/vwc-textarea';
import '@vonage/vwc-textfield';

const vwcElementsSupported = ['vwc-textarea', 'vwc-textfield'];

describe.only('autofocus', () => {
	it('should NOT throw on invalid input', async () => {
		handleAutofocus();
		handleAutofocus(null);
		handleAutofocus('some');
	});

	vwcElementsSupported.forEach((vwcElement) => {
		describe(`autofocus behaviour of '${vwcElement}'`, () => {
			it('should focus on target if no other element focused in parent', async () => {
				clearAnyFocus();

				const [e] = textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`);
				await waitNextTask();

				assertFocusStatus(e, true);
				e.remove();
			});

			it('should NOT "steal" focus from already focused element in parent in any', async () => {
				const [input] = textToDomToParent('<input/>');
				input.focus();

				const [e] = textToDomToParent(`<${vwcElement} autofocus></${vwcElement}>`);
				await waitNextTask();

				assertFocusStatus(e, false);
				e.remove();
				input.remove();
			});

			it('should NOT focus on target "autofocus" not specified', async () => {
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
	const currentlyFocused = document.querySelector(':focus');
	if (currentlyFocused) {
		currentlyFocused.blur();
	}
}

function assertFocusStatus(vividInput, status) {
	expect(vividInput.matches(':focus-within')).equal(status);
	expect(
		vividInput.shadowRoot.querySelector('input, textarea').matches(':focus')
	).equal(status);
}
