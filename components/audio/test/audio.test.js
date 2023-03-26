import '@vonage/vwc-audio';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask
} from '../../../test/test-helpers.js';
import { VWCAudio } from '../vwc-audio.js';
import 'chai-dom';

describe('vwc-audio', () => {
	const addElements = isolatedElementsCreation();

	it('should register as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-audio', 'vwc-audio element is not defined')
		);
	});

	it(`should live in the DOM`, function () {
		const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
		expect(audioElement instanceof VWCAudio).to.eq(true);
	});

	it(`should live in the DOM without seekbar`, function () {
		const [audioElement] = addElements(textToDomToParent(`<vwc-audio noseek></vwc-audio>`));
		expect(audioElement instanceof VWCAudio).to.eq(true);
	});

	it(`should set the src property if src attribute is set`, async function () {
		const url = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3';
		const [actualElement] = addElements(textToDomToParent(`<vwc-audio src="${url}"></vwc-audio>`));
		expect(actualElement.src).to.eq(url);
	});

	it(`should not show scrub-bar if noseek is set`, async function () {
		const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio noseek></vwc-audio>`));
		await waitNextTask();
		expect(vwcAudioEl.shadowRoot.querySelector('vwc-scrub-bar')).not.to.exist;
	});

	it(`should show timestamp indicator when "timestamp" is set`, async function () {
		const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio timestamp></vwc-audio>`));
		await waitNextTask();
		expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position')).to.exist;
	});

	it('should cover audio methods', async function () {
		const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
		await waitNextTask();
		audioElement.currentTime = 5;
		audioElement.pause();
		audioElement.play();
	});

	describe('play', () => {
		it('should return to stop mode when src changes', async function () {
			Audio.prototype.play = function () {
				this.dispatchEvent(new Event('play'));
			};
			const [audioElement] = (textToDomToParent(`<vwc-audio></vwc-audio>`));
			await waitNextTask();
			audioElement.src = 'https://download.samplelib.com/mp3/sample-9s.mp3';

			await audioElement.updateComplete;
			audioElement.play();
			await audioElement.updateComplete;
			audioElement.src = 'https://download.samplelib.com/mp3/sample-6s.mp3';
			await audioElement.updateComplete;
			await waitNextTask();
			expect(audioElement.shadowRoot.querySelector('vwc-icon').type.includes('play')).to.equal(true);
		});
	});

});
