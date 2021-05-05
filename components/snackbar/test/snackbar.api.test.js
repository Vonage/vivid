import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { showAndWait, assertEventWithReason } from './snackbar-utils.test';

describe('snackbar API', () => {
	let addElement = isolatedElementsCreation();

	it(`should close on close API with specified reason`, async () => {
		const reason = 'some reason';
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		await showAndWait(snackbar);

		expect(snackbar.hasAttribute('open')).true;

		const closingPromise = new Promise((r) => {
			snackbar.addEventListener('closing', r);
		});
		const closedPromise = new Promise((r) => {
			snackbar.addEventListener('closed', r);
		});
		snackbar.close(reason);

		const [closingEvent, closedEvent] = await Promise.all([closingPromise, closedPromise]);
		assertEventWithReason(closingEvent, 'closing', reason);
		assertEventWithReason(closedEvent, 'closed', reason);
	});
});
