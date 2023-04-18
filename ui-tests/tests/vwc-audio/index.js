import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-audio';

async function setAudioSrcWithInfinityDuration() {
	const audio = document.querySelector('#infinity-duration');
	Object.defineProperty(audio._audio, 'duration', {value: Infinity});

	audio._audio.dispatchEvent(new Event('loadedmetadata'));

	await audio.updateComplete;
}

export async function createElementVariations(wrapper) {
	const testWrapper = document.createElement('div');
	wrapper.classList.add('grid');
	testWrapper.classList.add('grid');
	testWrapper.innerHTML =
		`
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" timestamp></vwc-audio>
<vwc-audio id="badSrc" timestamp></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" connotation="primary"></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" disabled connotation="primary"></vwc-audio>
<vwc-audio id="infinity-duration" timestamp></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" timestamp connotation="primary"></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" noseek="true"></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" disabled connotation="primary"></vwc-audio>
<vwc-audio src="https://download.samplelib.com/mp3/sample-6s.mp3" disabled connotation="cta" timestamp></vwc-audio>
`;

	wrapper.appendChild(testWrapper);
	const audios = Array.from(document.querySelectorAll('vwc-audio'));
	await Promise.all(audios.map(audio => audio.updateComplete));
	const sourcedAudios = audios.filter(audio => audio.src);
	await Promise.all(sourcedAudios.map(audio => new Promise(res => audio._audio.addEventListener('loadedmetadata', res))));

	await setAudioSrcWithInfinityDuration();

	await vvdCore.settled;
}


