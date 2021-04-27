import '@vonage/vwc-menu';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-check-list-item';
import {
	isolatedElementsCreation,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-menu', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-menu', 'vwc-menu element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [menu] = addElement(textToDomToParent(
			'<vwc-menu id="menu-a"></vwc-menu>'
		));
		await menu.updateComplete;
		expect(menu.shadowRoot.innerHTML).to.equalSnapshot();
	});

	const preventAutoCloseCases = ['multi', 'activatable'];
	describe(`non auto-closable menu (${preventAutoCloseCases.join(', ')})`, () => {
		for (const configCase of preventAutoCloseCases) {
			it(`should keep the menu opened when '${configCase}'`, async () => {
				const [menu] = addElement(textToDomToParent(
					`<vwc-menu ${configCase}>
						<vwc-check-list-item>Test A</vwc-check-list-item>
						<vwc-check-list-item>Test B</vwc-check-list-item>
					</vwc-menu>`
				));
				await menu.updateComplete;
				menu.open = true;
				await menu.updateComplete;
				expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;

				/* eslint-disable no-await-in-loop */
				for (const checkListItem of menu.children) {
					checkListItem.click();
					await checkListItem.updateComplete;
					expect(checkListItem.hasAttribute('selected')).true;
				}

				expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;
			});
		}
	});
});
