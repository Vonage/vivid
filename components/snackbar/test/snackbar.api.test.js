import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { openSnackbar, assertEventWithReason, getEventPromise } from './snackbar-utils.test';

describe('snackbar API', () => {
	let addElement = isolatedElementsCreation();

	it(`should open on show API`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		await openSnackbar(snackbar);

		expect(snackbar.hasAttribute('open')).true;
	});

	it(`should close on close API with specified reason`, async () => {
		const reason = 'some reason';
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		await openSnackbar(snackbar);

		const closingPromise = getEventPromise(snackbar, 'closing');
		const closedPromise = getEventPromise(snackbar, 'closed');
		snackbar.close(reason);

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', reason);
		assertEventWithReason(closedEvent, 'closed', reason);
	});
});

