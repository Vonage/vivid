import '@vonage/vwc-list/vwc-list-expansion-panel';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_LIST_EXPANSION_PANEL = 'vwc-list-expansion-panel';

describe('list expansion panel', () => {
	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				VWC_LIST_EXPANSION_PANEL,
				`${VWC_LIST_EXPANSION_PANEL} element is not defined`
			)
		);
	});
});
