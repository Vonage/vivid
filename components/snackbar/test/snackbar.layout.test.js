import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
	assertDistancePixels
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { showAndWait } from './snackbar-utils.test';

describe('snackbar layout', () => {
	let addElement = isolatedElementsCreation();

	it(`should have dismissible button positioned correctly`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} dismissible></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
		expect(snackbarSurface).exist;
		const dismissButton = snackbar.shadowRoot.querySelector('.dismiss-button');
		expect(dismissButton).exist;

		await showAndWait(snackbar);

		assertDistancePixels(dismissButton, snackbarSurface, 'top', 16);
		assertDistancePixels(dismissButton, snackbarSurface, 'right', 16);
	});

	it(`should have icon positioned correctly`, async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} icon="home"></${COMPONENT_NAME}>`)
		);
		await snackbar.updateComplete;
		const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
		expect(snackbarSurface).exist;
		const icon = snackbar.shadowRoot.querySelector('vwc-note').shadowRoot.querySelector('vwc-icon');
		expect(icon).exist;

		await showAndWait(snackbar);

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
				const [snackbar] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} position="${position}"></${COMPONENT_NAME}>`)
				);
				await snackbar.updateComplete;
				const snackbarSurface = snackbar.shadowRoot.querySelector('.mdc-snackbar__surface');
				expect(snackbarSurface).exist;

				await showAndWait(snackbar);
				for (const [expectedProperty, expectedValue] of Object.entries(expectations)) {
					assertDistancePixels(document.body, snackbarSurface, expectedProperty, expectedValue);
				}
			});
		}
	});
});
