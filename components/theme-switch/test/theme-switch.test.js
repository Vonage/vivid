import '@vonage/vwc-theme-switch';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval,
} from '../../../test/test-helpers';
import {
	getBaseVarNames,
	assertBaseVarsMatch,
	PRINCIPAL_VARIABLES_FILTER,
} from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-theme-switch';

describe('theme switch', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-theme-switch element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const actualElement = addedElements[0];
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('basic functionality', () => {
		it('should have basic variables set', async () => {
			assertBaseVarsMatch('light', PRINCIPAL_VARIABLES_FILTER);
		});

		it('should change color and background upon switch', async () => {
			const testSet = {};
			const actualElements = addElement(
				textToDomToParent(`
						<${COMPONENT_NAME}></${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
			const themeSelector = actualElements[0];

			//	switch to dark
			themeSelector.shadowRoot.querySelector('vwc-switch').click();
			await waitInterval(50);
			getBaseVarNames('dark', PRINCIPAL_VARIABLES_FILTER).forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key] = new Set([varVal]);
			});

			//	switch to light
			themeSelector.shadowRoot.querySelector('vwc-switch').click();
			await waitInterval(50);
			getBaseVarNames('light', PRINCIPAL_VARIABLES_FILTER).forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key].add(varVal);
			});

			expect(testSet).not.empty;
			Object.values(testSet).forEach((varSet) => expect(varSet.size).equal(2));
		});
	});
});
