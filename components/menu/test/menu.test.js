import '../vwc-menu.js';
import '../../button/vwc-button.js';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('test vwc-menu', () => {
	it('vwc-menu is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-menu', 'vwc-menu element is not defined'));
	});

	it('vwc-menu has internal contents',  async () => {
		const docFragContainer = textToDomToParent('<vwc-menu id="menu-a"></vwc-menu>');
		await waitNextTask();
		const actualElement = docFragContainer[0];
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();

	});
});
