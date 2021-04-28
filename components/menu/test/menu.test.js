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

	describe('non auto-closable menu', () => {
		it(`should keep the menu opened when 'multi'`, async () => {
			const [menu] = addElement(textToDomToParent(
				getListWithNItems(2, 'multi')
			));
			await menu.updateComplete;
			menu.open = true;
			await menu.updateComplete;
			expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;

			const allClickedPromises = Array.from(menu.children).map((checkListItem) => {
				checkListItem.click();
				return checkListItem.updateComplete;
			});
			await Promise.all(allClickedPromises);
			for (const checkListItem of menu.children) {
				expect(checkListItem.hasAttribute('selected')).true;
			}

			expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;
		});

		it(`should keep the menu opened when 'activatable'`, async () => {
			const [menu] = addElement(textToDomToParent(
				getListWithNItems(2, 'activatable')
			));
			await menu.updateComplete;
			menu.open = true;
			await menu.updateComplete;
			expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;

			const firstListItem = menu.children[0];
			firstListItem.click();
			await firstListItem.updateComplete;

			expect(firstListItem.hasAttribute('selected')).true;
			expect(firstListItem.hasAttribute('activated')).true;
			expect(menu.shadowRoot.querySelector('.mdc-menu-surface').hasAttribute('open')).true;
		});
	});
});

function getListWithNItems(n, attributes = []) {
	const attrs = Array.isArray(attributes) ? attributes : [attributes];
	return `<vwc-menu ${attrs.join(' ')}>
		${new Array(n)
		.fill(0)
		.map((_v, i) => `<vwc-check-list-item>Item ${i}</vwc-check-list-item>`)
		.join()
}
	</vwc-menu>`;
}
