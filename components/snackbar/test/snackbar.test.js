import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('snackbar', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-snackbar is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-snackbar element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
