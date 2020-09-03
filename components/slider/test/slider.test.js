import '../vwc-slider.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_SLIDER = 'vwc-slider';

describe('slider', () => {
	describe('init flow', () => {
		it('should define vwc-slider as a custom element', () => {
			assert.exists(customElements.get(VWC_SLIDER, 'vwc-slider element is not defined'));
		});

		it('should have internal contents', async () => {
			const actualElements = textToDomToParent(`<${VWC_SLIDER}></${VWC_SLIDER}>`, document.body);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot({ ignoreAttributes: ['style'] });
			actualElements.forEach(e => e.remove());
		});
	});

	describe('styling', () => {
		it('should style the basic slider', async () => {
			const actualElements = textToDomToParent(`<${VWC_SLIDER} min="0" max="100" value="50"></${VWC_SLIDER}>`, document.body);
			await waitNextTask();

			const sliderTrack = actualElements[0].shadowRoot.querySelector('.mdc-slider__track');
			expect(sliderTrack).to.exist;
			assertComputedStyle(sliderTrack, { backgroundColor: 'rgb(19, 20, 21)' });

			const sliderThumb = actualElements[0].shadowRoot.querySelector('.mdc-slider__thumb');
			expect(sliderThumb).to.exist;
			assertComputedStyle(sliderThumb, { fill: 'rgb(19, 20, 21)' });

			actualElements.forEach(e => e.remove());
		});
	});
});
