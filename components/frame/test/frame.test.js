import '../vwc-frame.js';
import { textToDomToParent, waitNextTask, randomAlpha } from '../../../utils/js/test-helpers.js';
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
			const computedStyle = getComputedStyle(h1);
			expect(computedStyle.fontFamily).to.equal('SpeziaWebVariable', 'font family is NOT as expected');
			expect(computedStyle.fontSize).to.equal('32px', 'font size is NOT as expected');
			expect(computedStyle.fontWeight).to.equal('700', 'font weight is NOT as expected');
			expect(computedStyle.fontStretch).to.equal('50%', 'font stretch is NOT as expected');
			expect(computedStyle.lineHeight).to.equal('25.7324px', 'line height is NOT as expected');
		});
	});
});