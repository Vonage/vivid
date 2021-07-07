import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-audio';

export async function createElementVariations(wrapper) {
	const audioElementWrapper = document.createElement('div');
	audioElementWrapper.innerHTML =
		`
<vwc-audio></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>`;
	wrapper.appendChild(audioElementWrapper);

	await vvdCore.settled;
}


