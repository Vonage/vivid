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
	let closingPromise;
	let closedPromise;

	beforeEach(async () => {
		const [s] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible>
				<vwc-button slot="action">Action</vwc-button>
			</${COMPONENT_NAME}>`)
		);
		await s.updateComplete;
		await openSnackbar(s);
		snackbar = s;
		closingPromise = getEventPromise(s, 'closing');
		closedPromise = getEventPromise(s, 'closed');
	});

	it(`should close on dismiss with reason 'dismiss'`, async () => {
		const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');
		dismissButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'dismiss');
		assertEventWithReason(closedEvent, 'closed', 'dismiss');
	});

	it(`should close on action with reason 'action'`, async () => {
		const actionButton = snackbar.querySelector('vwc-button');
		actionButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'action');
		assertEventWithReason(closedEvent, 'closed', 'action');
	});
});
