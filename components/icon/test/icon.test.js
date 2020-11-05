import '@vonage/vwc-icon';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitInterval,
	waitNextTask,
} from '../../../test/test-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

describe('vwc-icon', () => {
	const addElement = isolatedElementsCreation();
	it('vwc-icon is defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-icon', 'vwc-icon element is not defined')
		);
	});

	it('validates vwc-icon svg integrity', async () => {
		const iconFetchTimeout = 1000 / 5;
		const [el] = addElement(textToDomToParent(`<vwc-icon></vwc-icon>`));
		await waitNextTask();
		const iconsNames = ['alarm', 'car'];

		for (let iconIndex in iconsNames) {
			el.setAttribute('type', iconsNames[iconIndex]);
			await waitInterval(iconFetchTimeout);
			expect(el.shadowRoot.querySelector('svg').innerHTML).to.equalSnapshot();
		}
	});
});
