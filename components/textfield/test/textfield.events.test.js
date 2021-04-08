import { COMPONENT_NAME } from '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	getEventsCollector,
	notifyInput
} from './textfield.utils.test.js';

describe('textfield events', () => {
	const addElement = isolatedElementsCreation();

	describe('input', () => {
		it('fire input event when internal input changed', async function () {
			const [textfield] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} autovalidate pattern="[0-9]+" validationMessage="error"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const events = getEventsCollector('input', textfield);

			notifyInput(textfield);
			await waitNextTask();

			expect(events.length).equal(1);
			expect(events[0].target).equal(textfield);
		});
	});
});
