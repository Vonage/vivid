import '@vonage/vwc-accordion/vwc-accordion';
import '@vonage/vwc-expansion-panel/vwc-expansion-panel';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-accordion';

describe('accordion', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-accordion element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}></${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`accordion visibility`, function () {
		it('should only allow one expansion panel open at a time', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME}>
						<vwc-expansion-panel header="panel 1" open></vwc-expansion-panel>
						<vwc-expansion-panel header="panel 2" open></vwc-expansion-panel>
					</${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(1);
		});

		it('should have all expansion panels open when set to multi', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME} multi>
						<vwc-expansion-panel open header="panel 1"></vwc-expansion-panel>
						<vwc-expansion-panel open header="panel 2"></vwc-expansion-panel>
					</${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(2);
		});

		it('should have all expansion panels closed', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME}>
						<vwc-expansion-panel header="panel 1" open></vwc-expansion-panel>
						<vwc-expansion-panel header="panel 2"></vwc-expansion-panel>
					</${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
			actualElement.closeAll();
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(0);
		});
	});
});
