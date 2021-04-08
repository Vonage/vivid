import { COMPONENT_NAME } from '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';

describe('textfield events', () => {
	const addElement = isolatedElementsCreation();

	describe('input', () => {
		it('fire input event when internal input changed', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate pattern="[0-9]+" validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const events = getEventsCollector('input', textfield);
			const innerInput = getInnerInput(textfield);

			notifyInput(innerInput);
			await waitNextTask();

			expect(events.length).equal(1);
			expect(events[0].target).equal(textfield);
		});
	});
});

function getEventsCollector(eventType, textfield) {
	const result = [];
	textfield.addEventListener(eventType, e => result.push(e));
	return result;
}

function getInnerInput(textfield) {
	const result = textfield.querySelector('input');
	if (!result) {
		throw new Error('failed to obtain inner input from textfield, not yet fully initialized?');
	}
	return result;
}

function notifyInput(texfield) {
	const innerInput = getInnerInput(texfield);
	innerInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
}
