import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { showAndWait, assertEventWithReason } from './snackbar-utils.test';

describe('snackbar events', () => {
	let addElement = isolatedElementsCreation();

	it(`should close on dismiss with reason 'dismiss'`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible>
				<vwc-button slot="action">Action</vwc-button>
			</${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		await showAndWait(snackbar);

		expect(snackbar.hasAttribute('open')).true;
		const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');
		expect(dismissButton).exist;

		const closingPromise = new Promise((r) => {
			snackbar.addEventListener('closing', r);
		});
		const closedPromise = new Promise((r) => {
			snackbar.addEventListener('closed', r);
		});
		dismissButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'action');
		assertEventWithReason(closedEvent, 'closed', 'action');
	});

	it(`should close on action with reason 'action'`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible>
				<vwc-button slot="action">Action</vwc-button>
			</${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		await showAndWait(snackbar);

		expect(snackbar.hasAttribute('open')).true;
		const actionButton = snackbar.querySelector('vwc-button');
		expect(actionButton).exist;

		const closingPromise = new Promise((r) => {
			snackbar.addEventListener('closing', r);
		});
		const closedPromise = new Promise((r) => {
			snackbar.addEventListener('closed', r);
		});
		actionButton.click();

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', 'action');
		assertEventWithReason(closedEvent, 'closed', 'action');
	});
});
