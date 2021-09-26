import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { openSnackbar, assertEventWithReason, getEventPromise } from './snackbar-utils.test.js';

describe('snackbar events', () => {
	let addElement = isolatedElementsCreation();
	let snackbar;
	let closingPromise;
	let closedPromise;

	beforeEach(async () => {
		snackbar = await createSnackbar('message', true);
		await openSnackbar(snackbar);
		closingPromise = getEventPromise(snackbar, 'closing');
		closedPromise = getEventPromise(snackbar, 'closed');
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

	async function createSnackbar(message = 'message', dismissible = false) {
		const [result] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} ${dismissible ? 'dismissible' : ''} message="${message}">
				<vwc-button slot="action">Action</vwc-button>
			</${COMPONENT_NAME}>`)
		);
		await result.updateComplete;
		return result;
	}
});
