import '../vwc-fab.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('test vwc-fab', () => {
	const addElement = isolatedElementsCreation();
	it('vwc-fab is defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-fab', 'vwc-fab element is not defined')
		);
	});

	it('vwc-fab has internal contents', async () => {
		const actualElements = addElement(
			textToDomToParent('<vwc-fab id="fab-a"></vwc-fab>')
		);
		await waitNextTask();
		expect(actualElements[0]).dom.to.equalSnapshot();
	});
});
