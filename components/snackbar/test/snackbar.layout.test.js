import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	waitInterval,
	textToDomToParent,
	assertDistancePixels
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { openSnackbar } from './snackbar-utils.test';

describe('snackbar layout', () => {
	let addElement = isolatedElementsCreation();

	it(`should have dismissible button positioned correctly`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible></${COMPONENT_NAME}>`)
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

		assertDistancePixels(icon, snackbarSurface, 'top', 20);
		assertDistancePixels(icon, snackbarSurface, 'left', 20);
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
				const [snackbarContainer] = addElement(
					textToDomToParent(`<div style="transform: translate(0); width: 800px; height: 600px;"><${COMPONENT_NAME} position="${position}"></${COMPONENT_NAME}></div>`)
				);
				const snackbar = snackbarContainer.firstElementChild;
				await snackbar.updateComplete;
				const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');

				await openSnackbar(snackbar);
				await waitInterval(16);
				for (const [expectedProperty, expectedValue] of Object.entries(expectations)) {
					assertDistancePixels(snackbarContainer, snackbarSurface, expectedProperty, expectedValue);
				}
			});
		}
	});
});
