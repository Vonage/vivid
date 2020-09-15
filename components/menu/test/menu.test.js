import '../vwc-menu.js';
import '../../button/vwc-button.js';
import { textToDomToParent, waitNextTask } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-menu', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-menu', 'vwc-menu element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const docFragContainer = textToDomToParent(
			'<vwc-menu id="menu-a"></vwc-menu>'
		);
		await waitNextTask();
		const actualElement = docFragContainer[0];
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
