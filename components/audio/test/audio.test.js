import '@vonage/vwc-audio';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
	waitInterval
} from '../../../test/test-helpers';
import { VWCAudio } from '../vwc-audio';
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
		await waitInterval(1000);
		expect(actualElement.src).to.eq(url);
	});

	it(`should not show scrub-bar is noseek is set`, async function () {
		const [vwcAudioEl] = addElements(textToDomToParent(`<vwc-audio noseek></vwc-audio>`));
		await waitNextTask();
		expect(vwcAudioEl.shadowRoot.querySelector('vwc-scrub-bar')).not.to.exist;
	});

	it('should cover audio methods', async function () {
		const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
		await waitNextTask();
		audioElement.currentTime = 5;
		audioElement.pause();
		audioElement.play();
	});
});
