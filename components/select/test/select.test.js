import '../vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const
	VWC_SELECT = 'vwc-select';

describe('select', () => {
	it('should be defined as a custom element', () => {
		assert.exists(customElements.get(VWC_SELECT, 'vwc-select element is not defined'));
	});

	describe('init flow', () => {
		it('should have the required elements', async () => {
			const actualElements = textToDomToParent(`
				<${VWC_SELECT}>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
			await waitNextTask();
			expect(actualElements[0]).dom.to.equalSnapshot();
		});
	});

	describe('typography', () => {
		it('should have set typography for a label', async () => {
			const actualElements = textToDomToParent(`
				<${VWC_SELECT} outlined label="VWC Select">
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
			await waitNextTask();
			const labelElement = actualElements[0].shadowRoot.querySelector('.mdc-notched-outline').querySelector('#label');
			expect(labelElement).to.exist;
			assertComputedStyle(labelElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '18.4px',
				letterSpacing: '0.133333px',
				textTransform: 'none'
			});
		});

		it('should have set typography for a helper', async () => {
			const actualElements = textToDomToParent(`
				<${VWC_SELECT} outlined label="VWC Select" helper="Helper text">
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
			await waitNextTask();
			const helperElement = actualElements[0].shadowRoot.querySelector('.mdc-select-helper-text');
			expect(helperElement).to.exist;
			assertComputedStyle(helperElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '12.642px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: 'normal',
				letterSpacing: '0.421399px',
				textTransform: 'none'
			});
		});
	});
});