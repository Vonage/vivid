import '../vwc-frame.js';
import { textToDomToParent, waitNextTask, randomAlpha, assertComputedStyle } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const
	VWC_FRAME = 'vwc-frame';

describe('vwc-frame', () => {
	it('should have vwc-frame element defined', () => {
		assert.exists(customElements.get(VWC_FRAME, 'vwc-frame element is not defined'));
	});

	describe('init flow', () => {
		it('should have the required contents', async () => {
			const actualElements = textToDomToParent(`<${VWC_FRAME}></${VWC_FRAME}>`);
			await waitNextTask();
			expect(actualElements[0]).dom.to.equalSnapshot();
		});
	});

	describe('typography applied correctly', () => {
		it('should have style correctly H1 element', async () => {
			const randomId = randomAlpha();
			const actualElements = textToDomToParent(`<${VWC_FRAME}><h1 id="${randomId}">Header 1</h1></${VWC_FRAME}>`);
			await waitNextTask();
			const h1 = actualElements[0].querySelector('#' + randomId);
			expect(h1).to.exist;
			const expectedStyle = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '46.1841px',
				fontWeight: '500',
				fontStretch: '75%',
				lineHeight: '50.9028px',
				letterSpacing: 'normal',
				textTransform: 'none'
			};
			assertComputedStyle(h1, expectedStyle);
		});

		it('should have style correctly H2 element', async () => {
			const randomId = randomAlpha();
			const actualElements = textToDomToParent(`<${VWC_FRAME}><h2 id="${randomId}">Header 2</h2></${VWC_FRAME}>`);
			await waitNextTask();
			const h2 = actualElements[0].querySelector('#' + randomId);
			expect(h2).to.exist;
			const expectedStyle = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '36.4912px',
				fontWeight: '500',
				fontStretch: '75%',
				lineHeight: '45.0101px',
				letterSpacing: 'normal',
				textTransform: 'none'
			};
			assertComputedStyle(h2, expectedStyle);
		});

		it('should have style correctly P element', async () => {
			const randomId = randomAlpha();
			const actualElements = textToDomToParent(`<${VWC_FRAME}><p id="${randomId}">Paragraph</p></${VWC_FRAME}>`);
			await waitNextTask();
			const p = actualElements[0].querySelector('#' + randomId);
			expect(p).to.exist;
			const expectedStyle = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '16px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '25.7324px',
				letterSpacing: 'normal',
				textTransform: 'none'
			};
			assertComputedStyle(p, expectedStyle);
		});
	});
});