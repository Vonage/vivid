import '../vwc-expansion-panel.js';
import '../vwc-expansion-panel-list.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-expansion-panel-list';

describe('expansion panel list', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-expansion-panel-list element is not defined')
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

	describe(`expansion panel visibility`, function () {
		let actualElement;
		beforeEach(async () => {
			[actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME}>
						<vwc-expansion-panel header="panel 1" open></vwc-expansion-panel>
						<vwc-expansion-panel header="panel 2" open></vwc-expansion-panel>
						<vwc-expansion-panel header="panel 3"></vwc-expansion-panel>
						<vwc-expansion-panel header="panel 3"></vwc-expansion-panel>
					</${COMPONENT_NAME}>
				`)
			);
			await waitNextTask();
		});

		it('should only allow one expansion panel open at a time', async () => {
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(1)
		});

		it('should allow multiple expansion panels open when set to multi', async () => {
			actualElement.multi = true;
			await waitNextTask();
			actualElement.openAll();
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(4)
		});

		it('should have all expansion panels closed', async () => {	
			actualElement.closeAll();
			const openExpansionPanels = actualElement.getOpened();
			expect(openExpansionPanels.length).to.equal(0)
		});
	});
});
