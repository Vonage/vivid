import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { openSnackbar, assertEventWithReason, getEventPromise } from './snackbar-utils.test';

describe('snackbar events', () => {
	let addElement = isolatedElementsCreation();
	let snackbar;

	beforeEach(async () => {
		const [s] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible>
				<vwc-button slot="action">Action</vwc-button>
			</${COMPONENT_NAME}>`)
		);
		await s.updateComplete;
		await openSnackbar(s);
		snackbar = s;
	});

	it(`should close on dismiss with reason 'dismiss'`, async () => {
		const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');

		const closingPromise = getEventPromise(snackbar, 'closing');
		const closedPromise = getEventPromise(snackbar, 'closed');
		dismissButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'dismiss');
		assertEventWithReason(closedEvent, 'closed', 'dismiss');
	});

	it(`should close on action with reason 'action'`, async () => {
		const actionButton = snackbar.querySelector('vwc-button');

		const closingPromise = getEventPromise(snackbar, 'closing');
		const closedPromise = getEventPromise(snackbar, 'closed');
		actionButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'action');
		assertEventWithReason(closedEvent, 'closed', 'action');
	});
});
