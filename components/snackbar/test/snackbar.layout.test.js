import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	isFirefox,
	waitInterval,
	textToDomToParent,
	assertDistancePixels
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { openSnackbar } from './snackbar-utils.test';

describe('snackbar layout', () => {
	let addElement = isolatedElementsCreation();

	for (const message of ['short', 'long '.repeat(40)]) {
		it(`should have dismissible button positioned correctly (message len = ${message.length})`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} dismissible message="${message}"></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
			const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');

			await openSnackbar(snackbar);

			assertDistancePixels(dismissButton, snackbarSurface, 'top', (snackbarSurface.offsetHeight - dismissButton.offsetHeight) / 2);
			assertDistancePixels(dismissButton, snackbarSurface, 'right', 16);
		});
	}

	it(`should have dismissible button positioned correctly (legacy)`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible legacy></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
		const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');

		await openSnackbar(snackbar);

		assertDistancePixels(dismissButton, snackbarSurface, 'top', 16);
		assertDistancePixels(dismissButton, snackbarSurface, 'right', 16);
	});

	it(`should have icon positioned correctly`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} icon="home"></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
		const innerNote = snackbar.shadowRoot.querySelector('vwc-note');
		await innerNote.updateComplete;
		const icon = innerNote.shadowRoot.querySelector('.note-icon');

		await openSnackbar(snackbar);

		assertDistancePixels(icon, snackbarSurface, 'top', 16);
		assertDistancePixels(icon, snackbarSurface, 'left', 16);
	});

	it(`should have icon positioned correctly (legacy)`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} icon="home" legacy></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
		const innerNote = snackbar.shadowRoot.querySelector('vwc-note');
		await innerNote.updateComplete;
		const icon = innerNote.shadowRoot.querySelector('.note-icon');

		await openSnackbar(snackbar);

		assertDistancePixels(icon, snackbarSurface, 'top', 20);
		assertDistancePixels(icon, snackbarSurface, 'left', 28);
	});

	describe('snackbar viewport position', () => {
		const positions = {
			'TOP-START': { top: 8, left: 8 },
			'TOP-CENTER': { top: 8 },
			'TOP-END': { top: 8, right: 8 },
			'BOTTOM-START': { left: 8 },
			'BOTTOM-CENTER': {},
			'BOTTOM-END': { right: 8 }
		};

		for (const [position, expectations] of Object.entries(positions)) {
			it(`should have snackbar positioned correctly for '${position}'`, async () => {
				const [snackbar] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} position="${position}"></${COMPONENT_NAME}>`)
				);
				await snackbar.updateComplete;
				const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');

				await openSnackbar(snackbar);
				if (isFirefox()) {
					await waitInterval(16);
				}
				for (const [expectedProperty, expectedValue] of Object.entries(expectations)) {
					assertDistancePixels(document.body, snackbarSurface, expectedProperty, expectedValue);
				}
			});
		}
	});
});
