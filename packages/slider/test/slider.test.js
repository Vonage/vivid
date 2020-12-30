import '@vonage/vwc-slider';
import schemeService from '@vonage/vvd-scheme';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_SLIDER = 'vwc-slider';

describe('slider', () => {
	let addElement = isolatedElementsCreation();

	beforeEach(async () => {
		await schemeService.set('light');
	});

	describe('init flow', () => {
		it('should define vwc-slider as a custom element', () => {
			assert.exists(
				customElements.get(VWC_SLIDER, 'vwc-slider element is not defined')
			);
		});

		it('should have internal contents', async () => {
			const actualElements = addElement(
				textToDomToParent(`<${VWC_SLIDER}></${VWC_SLIDER}>`)
			);
			await waitNextTask();
			expect(actualElements[0]).shadowDom.to.equalSnapshot({
				ignoreAttributes: ['style'],
			});
		});
	});

	describe('styling', () => {
		it('should style the basic slider', async () => {
			const actualElements = addElement(
				textToDomToParent(
					`<${VWC_SLIDER} min="0" max="100" value="50"></${VWC_SLIDER}>`
				)
			);
			await waitNextTask();
			const scheme = schemeService.getSelectedScheme();

			const sliderTrack = actualElements[0].shadowRoot.querySelector(
				'.mdc-slider__track'
			);
			expect(sliderTrack).to.exist;
			const expectedStylesTrack = {
				backgroundColor: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
			};
			assertComputedStyle(sliderTrack, expectedStylesTrack);

			const sliderThumb = actualElements[0].shadowRoot.querySelector(
				'.mdc-slider__thumb'
			);
			expect(sliderThumb).to.exist;
			const expectedStylesThumb = {
				fill: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
			};
			assertComputedStyle(sliderThumb, expectedStylesThumb);
		});
	});
});
