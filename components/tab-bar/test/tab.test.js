import '../vwc-tab.js';
import {
	textToDomToParent,
	waitInterval,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tab';

describe('tab', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-tab element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const actualElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} label="Tab"></${COMPONENT_NAME}>`)
		);
		await waitInterval(50);
		expect(actualElements[0]).shadowDom.to.equalSnapshot();
	});
});
