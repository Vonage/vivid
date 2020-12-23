import '@vonage/vwc-list/vwc-list-expansion-panel';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const VWC_LIST_EXPANSION_PANEL = 'vwc-list-expansion-panel';

describe('list expansion panel', () => {
	let addElements = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				VWC_LIST_EXPANSION_PANEL,
				`${VWC_LIST_EXPANSION_PANEL} element is not defined`
			)
		);
	});

	it('should have the expected internal contents', async () => {
		addElements = textToDomToParent(
			`<${VWC_LIST_EXPANSION_PANEL}></${VWC_LIST_EXPANSION_PANEL}>`
		);
		const actualElement = addElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
