import '../vwc-textfield.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_TEXTFIELD = 'vwc-textfield';

describe('textfield', () => {
	it('should be defined as a custom element', async () => {
		assert.exists(customElements.get(VWC_TEXTFIELD, 'vwc-textfield element is not defined'));
	});

	it('should have internal contents', async () => {
		const addedElements = textToDomToParent(`<${VWC_TEXTFIELD}></${VWC_TEXTFIELD}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('typography', () => {
		it('should have set typography for a label', async () => {
			const actualElements = textToDomToParent(`<${VWC_TEXTFIELD} outlined label="Vwc textarea"></${VWC_TEXTFIELD}>`);
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
			const actualElements = textToDomToParent(`<${VWC_TEXTFIELD} outlined disabled label="Vwc textarea"></${VWC_TEXTFIELD}>`);
			await waitNextTask();
			const inputElement = actualElements[0].shadowRoot.querySelector('.mdc-text-field__input');
			expect(inputElement).to.exist;
			assertComputedStyle(inputElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: 'normal',
				letterSpacing: '0.133333px',
				textTransform: 'none'
			});
		});
	});
});
