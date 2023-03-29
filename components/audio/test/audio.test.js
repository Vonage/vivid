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

	describe('scrub-bar', function () {
		it(`should not show scrub-bar if noseek is set`, async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio noseek></vwc-audio>`));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('vwc-scrub-bar')).not.to.exist;
		});

		it('should add noseek-button to the scrub-bar when duration is Infinity', async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
			await waitNextTask();
			Object.defineProperty(vwcAudioEl._audio, 'duration', {
				get: () => Infinity
			});
			vwcAudioEl._audio.dispatchEvent(new Event('loadedmetadata'));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('vwc-scrub-bar').hasAttribute('noseek-button'))
				.to.equal(true);
		});
	});

	describe('timestamp', function () {
		it(`should show timestamp indicator when "timestamp" is set`, async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio timestamp></vwc-audio>`));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position')).to.exist;
		});

		it(`should hide timestamp indicator when "timestamp" is not set`, async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position')).not.to.exist;
		});

		it(`should show the end time correctly`, async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio timestamp></vwc-audio>`));
			vwcAudioEl._duration = 500;
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position').textContent).to.equal('0:00 / 8:20');
		});

		it(`should show the current time correctly`, async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio timestamp></vwc-audio>`));
			await waitNextTask();
			vwcAudioEl._duration = 500;
			vwcAudioEl._audio.currentTime = 500;
			vwcAudioEl._audio.dispatchEvent(new Event('timeupdate'));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position').textContent).to.equal('8:20 / 8:20');
		});

		it('should show null timestamp when duration is infinity', async function () {
			const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio timestamp></vwc-audio>`));
			await waitNextTask();
			Object.defineProperty(vwcAudioEl._audio, 'duration', {
				get: () => Infinity
			});
			vwcAudioEl._audio.dispatchEvent(new Event('loadedmetadata'));
			await waitNextTask();
			expect(vwcAudioEl.shadowRoot.querySelector('.playhead-position').textContent).to.equal('__ / __');
		});
	});


	describe('play', () => {
		let originalPlay = Audio.prototype.play;
		before(function () {
			Audio.prototype.play = function () {
				this.dispatchEvent(new Event('play'));
			};
		});

		after(function () {
			Audio.prototype.play = originalPlay;
		});

		it('should return to stop mode when src changes', async function () {

			const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
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
