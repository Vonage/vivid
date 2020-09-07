import '../vwc-textarea.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_TEXTAREA = 'vwc-textarea';

describe('textarea', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(customElements.get(VWC_TEXTAREA, 'vwc-textarea element is not defined'));
	});

	it('should have internal contents', async () => {
		const addedElements = textToDomToParent(`<${VWC_TEXTAREA}></${VWC_TEXTAREA}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', () => {
		it('should have set typography for a label', async () => {
			const actualElements = textToDomToParent(`<${VWC_TEXTAREA} outlined label="Vwc textarea"></${VWC_TEXTAREA}>`);
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

		it('should have set typography for an input', async () => {
			const actualElements = textToDomToParent(`<${VWC_TEXTAREA} outlined disabled label="Vwc textarea"></${VWC_TEXTAREA}>`);
			await waitNextTask();
			const inputElement = actualElements[0].shadowRoot.querySelector('.mdc-text-field__input');
			expect(inputElement).to.exist;
			assertComputedStyle(inputElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '24px',
				letterSpacing: '0.133333px',
				textTransform: 'none'
			});
		});
	});
});
