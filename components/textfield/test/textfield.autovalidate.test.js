import { COMPONENT_NAME } from '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { getInnerInput, notifyInput } from './textfield.utils.test.js';

describe('textfield validation', () => {
	const addElement = isolatedElementsCreation();

	describe('autovalidate', () => {
		it('should turn invalid upon invalid input (pattern)', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate pattern="[0-9]+" validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const innerInput = getInnerInput(textfield);

			innerInput.value = '324';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, true, true);

			innerInput.value = 'sdf';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, false, true);
		});

		it('should turn valid upon valid input (pattern)', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate pattern="[0-9]+" validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const innerInput = getInnerInput(textfield);

			innerInput.value = 'wer';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, false, true);

			innerInput.value = '123';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, true, true);
		});

		it('should turn invalid upon invalid input (required)', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate required validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const innerInput = getInnerInput(textfield);

			innerInput.value = '324';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, true, true);

			innerInput.value = '';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, false, true);
		});

		it('should turn valid upon valid input (required)', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate required validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const innerInput = getInnerInput(textfield);

			innerInput.value = '';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, false, true);

			innerInput.value = '123';
			notifyInput(textfield);
			await waitNextTask();
			assertValidityState(textfield, true, true);
		});
	});
});

function assertValidityState(texfield, valid, assertHelper = false) {
	// TODO: unmark the lines below when the invlalid class issue settled
	// const labelHint = texfield.shadowRoot.querySelector('.mdc-text-field--invalid');
	// if ((valid && labelHint) || (!valid && !labelHint)) {
	// 	throw new Error(`expected textfield validity to be '${valid}', but the invalid label state ${labelHint ? '' : 'NOT'} found`);
	// }
	if (assertHelper) {
		const helperHint = texfield.shadowRoot.querySelector('vwc-helper-message[is-error]');
		if ((valid && helperHint) || (!valid && !helperHint)) {
			throw new Error(`expected textfield validity to be '${valid}', but the invalid helper ${helperHint ? '' : 'NOT'} found`);
		}
	}
}
