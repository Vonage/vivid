import '../vwc-helper-message.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { layoutStyles, topLevelSelectors } from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-helper-message';

describe('helper message', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-helper-message is defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				'vwc-helper-message element is not defined'
			)
		);
	});

	it('should internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {});
});
