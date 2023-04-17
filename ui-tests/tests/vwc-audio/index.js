import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-audio';

function setAudioSrc(audios) {
	audios.forEach(audio => {
		if (audio.id) return;
		audio.src = 'fake';
		Object.defineProperty(audio._audio, 'error', {value: null});
		audio._audio.dispatchEvent(new Event('loadedmetadata'));
	});
}

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
<vwc-audio timestamp></vwc-audio>
<vwc-audio id="badSrc" timestamp></vwc-audio>
<vwc-audio connotation="primary"></vwc-audio>
<vwc-audio id="infinity-duration" timestamp></vwc-audio>
<vwc-audio timestamp connotation="primary"></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>
<vwc-audio disabled connotation="primary"></vwc-audio>
<vwc-audio disabled connotation="cta" timestamp></vwc-audio>
`;

	wrapper.appendChild(testWrapper);
	const audios = Array.from(document.querySelectorAll('vwc-audio'));
	await Promise.all(audios.map(audio => audio.updateComplete));
	setAudioSrc(audios);

	await setAudioSrcWithInfinityDuration();

	await vvdCore.settled;
}


