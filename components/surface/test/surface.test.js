import { COMPONENT_NAME } from '@vonage/vwc-surface';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('surface', () => {
	let addElement = isolatedElementsCreation();

	if (!addElement) {
		return;
	}

	it('vwc-surface is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-snackbar element is not defined')
		);
	});
});
