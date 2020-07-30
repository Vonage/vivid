import '../vwc-slider.js';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

describe('vwc-slider', () => {
	describe('init flow', () => {
		it('should define vwc-slider as a custom element', async () => {
			assert.exists(customElements.get('vwc-slider', 'vwc-slider element is not defined'));
		});

		it('vwc-slider has internal contents', async () => {
			const actualElements = textToDomToParent('<vwc-slider id="slider-a"></vwc-slider>', document.body);
			await waitNextTask();
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot({ ignoreAttributes: ['style'] });
		});
	});
});
