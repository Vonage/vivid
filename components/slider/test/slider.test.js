import '@vonage/vwc-slider';
import schemeService from '@vonage/vvd-scheme';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval,
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
			const [slider] = addElement(
				textToDomToParent(`<${VWC_SLIDER}></${VWC_SLIDER}>`)
			);
			await waitNextTask();
			expect(slider).shadowDom.to.equalSnapshot({
				ignoreAttributes: ['style'],
			});
		});

		it('should have thumb positioned correctly when rendered first in hidden space', async () => {
			const [wrapper] = addElement(
				textToDomToParent(`<div style="display: none"><${VWC_SLIDER} min="0" max="100" value="50"></${VWC_SLIDER}></div>`)
			);
			await waitNextTask();
			const slider = wrapper.firstElementChild;
			const thumb = slider.shadowRoot.querySelector('.mdc-slider__thumb-container');

			wrapper.style.display = 'block';
			assertComputedStyle(slider, { width: '120px' });
			await waitInterval(100);
			assertComputedStyle(thumb, { transform: 'matrix(1, 0, 0, 1, 49.5, 0)' });
		});
	});

	describe('styling', () => {
		it('should style the basic slider', async () => {
			const actualElements = addElement(
				textToDomToParent(
					`<${VWC_SLIDER} min="0" max="100" value="50" pin></${VWC_SLIDER}>`
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

			const sliderPin = actualElements[0].shadowRoot.querySelector(
				'.mdc-slider__pin'
			);
			expect(sliderPin).to.exist;
			const expectedStylesPin = {
				backgroundColor: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
				color: scheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
			};
			assertComputedStyle(sliderPin, expectedStylesPin);
		});

		it('should style the disabled slider', async () => {
			const [slider] = addElement(
				textToDomToParent(
					`<${VWC_SLIDER} disabled min="0" max="100" value="50" pin></${VWC_SLIDER}>`
				)
			);
			await waitNextTask();
			const scheme = schemeService.getSelectedScheme();

			const sliderTrack = slider.shadowRoot.querySelector(
				'.mdc-slider__track'
			);
			expect(sliderTrack).to.exist;
			const expectedStylesTrack = {
				backgroundColor: 'rgb(154, 154, 154)'
			};
			assertComputedStyle(sliderTrack, expectedStylesTrack);

			const sliderThumb = slider.shadowRoot.querySelector(
				'.mdc-slider__thumb'
			);
			expect(sliderThumb).to.exist;
			const expectedStylesThumb = {
				stroke: scheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
			};
			assertComputedStyle(sliderThumb, expectedStylesThumb);

			const sliderPin = slider.shadowRoot.querySelector(
				'.mdc-slider__pin'
			);
			expect(sliderPin).to.exist;
		});
	});
});
