import '@vonage/vwc-scheme-select';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval,
} from '../../../test/test-helpers';
import { getBaseVarNames } from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-scheme-select';

describe('scheme select', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				'vwc-scheme-select element is not defined'
			)
		);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		await waitNextTask();
		const actualElement = addedElements[0];
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('basic functionality', () => {
		it('should have basic variables set', async () => {
			const keys = getBaseVarNames('light');
			expect(keys).not.empty;
			keys.forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key);
				expect(varVal).exist;
			});
		});

		it('should change color and background upon switch', async () => {
			const testSet = {};
			const actualElements = addElement(
				textToDomToParent(`
						<${COMPONENT_NAME}></${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
			const schemeSelector = actualElements[0];

			//	switch to dark
			schemeSelector.shadowRoot.querySelector('.dark').click();
			await waitInterval(50);
			getBaseVarNames('dark').forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key] = new Set([varVal]);
			});

			//	switch to light
			schemeSelector.shadowRoot.querySelector('.light').click();
			await waitInterval(50);
			getBaseVarNames('light').forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key].add(varVal);
			});

			expect(testSet).not.empty;
			Object.values(testSet).forEach((varSet) => expect(varSet.size).equal(2));
		});
	});
});
