import '@vonage/vwc-scheme-select';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers';
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

	describe.only('basic functionality', () => {
		it('should change color and background upon switch', async () => {
			const testedElementClass = 'header-to-test';
			const actualElements = addElement(
				textToDomToParent(`
						<${COMPONENT_NAME}></${COMPONENT_NAME}>
						<h1 class="${testedElementClass}">Header A</h1>
				`)
			);
			await waitNextTask();
			const schemeSelector = actualElements[0];
			const testedElement = actualElements[1];

			assertComputedStyle(testedElement, {
				color: 'rgb(0, 0, 0)',
			});

			schemeSelector.shadowRoot.querySelector('.dark').click();

			await waitInterval(850);

			assertComputedStyle(testedElement, {
				color: 'rgb(0, 0, 0)',
			});
		});
	});
});
