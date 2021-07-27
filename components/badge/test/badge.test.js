import '../vwc-badge.js';
import {
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import { shapeStyles } from '../../../test/style-utils.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_BADGE = 'vwc-badge';

describe('badge', () => {
	const addElement = isolatedElementsCreation();

	it('vwc-badge is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_BADGE, 'vwc-badge element is not defined')
		);
	});

	it('should match internal contents', async () => {
		const [badge] = addElement(
			textToDomToParent(`<${VWC_BADGE} text="badge"></${VWC_BADGE}>`)
		);
		expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should match internal contents (legacy)', async () => {
		const [badge] = addElement(
			textToDomToParent(`<${VWC_BADGE}>badge</${VWC_BADGE}>`)
		);
		await badge.updateComplete;
		expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', function () {
		it(`should have set badge (text, default) typography correct`, async function () {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE} text="badge"></${VWC_BADGE}>`)
			);
			await badge.updateComplete;
			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(container, { ...(await getTypographyStyle('caption-bold')), lineHeight: '24px' });
		});
	});

	describe('sizing', () => {
		it('should have normal size by default', async () => {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE} text="badge"></${VWC_BADGE}>`)
			);
			await badge.updateComplete;
			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(container, { height: '24px' });
		});

		it('should have dense size when dense', async () => {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE} dense text="badge"></${VWC_BADGE}>`)
			);
			await badge.updateComplete;
			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(container, { height: '20px' });
		});

		it('should have enlarged size when enlarged', async () => {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE} enlarged text="badge"></${VWC_BADGE}>`)
			);
			await badge.updateComplete;
			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(container, { height: '28px' });
		});
	});

	describe('shape', () => {
		let badge;
		beforeEach(async () => {
			const [el] = addElement(
				textToDomToParent(
					`<${VWC_BADGE} layout="filled" text="badge"></${VWC_BADGE}>`
				)
			);
			await el.updateComplete;
			badge = el;
		});

		it('should have rounded shape by default', async () => {
			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(
				container,
				shapeStyles('rounded', 'badge')
			);
		});

		it('should have rounded shape when shape set to rounded', async () => {
			badge.shape = 'rounded';
			await badge.updateComplete;

			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(
				container,
				shapeStyles('rounded', 'badge')
			);
		});

		it('should have pill shape when shape set to pill', async () => {
			badge.shape = 'pill';
			await badge.updateComplete;

			const container = badge.shadowRoot.querySelector('.vwc-badge');
			assertComputedStyle(container,
				shapeStyles('pill', 'badge'));
		});
	});

	describe('icons', () => {
		it('should have icons when icons are set', async () => {
			const [badge] = addElement(
				textToDomToParent(
					`<${VWC_BADGE} icon="thumbs-down-line" iconTrailing="thumbs-up-line"></${VWC_BADGE}>`
				)
			);

			await badge.updateComplete;
			await badge.updateComplete;
			expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have icons added when icons are set dynamically (property)', async () => {
			const [badge] = addElement(
				textToDomToParent(
					`<${VWC_BADGE}></${VWC_BADGE}>`
				)
			);

			badge.icon = 'thumbs-down-line';
			badge.iconTrailing = 'thumbs-down-line';
			await badge.updateComplete;
			await badge.updateComplete;
			expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have icons added when icons are set dynamically (attribute)', async () => {
			const [badge] = addElement(
				textToDomToParent(
					`<${VWC_BADGE}></${VWC_BADGE}>`
				)
			);

			badge.setAttribute('icon', 'thumbs-down-line');
			badge.setAttribute('iconTrailing', 'thumbs-up-line');
			await badge.updateComplete;
			await badge.updateComplete;
			expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have icons removed when icons are unset (property)', async () => {
			const [badge] = addElement(
				textToDomToParent(
					`<${VWC_BADGE} icon="thumbs-down-line" iconTrailing="thumbs-up-line"></${VWC_BADGE}>`
				)
			);

			badge.icon = undefined;
			badge.iconTrailing = undefined;
			await badge.updateComplete;
			expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have icon removed when icon is unset (attribute)', async () => {
			const [badge] = addElement(
				textToDomToParent(
					`<${VWC_BADGE} icon="thumbs-down-line" iconTrailing="thumbs-up-line"></${VWC_BADGE}>`
				)
			);

			badge.removeAttribute('icon');
			badge.removeAttribute('iconTrailing');
			await badge.updateComplete;
			expect(badge.shadowRoot.innerHTML).to.equalSnapshot();
		});
	});
});
