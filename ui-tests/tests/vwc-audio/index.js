import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-audio';

export async function createElementVariations(wrapper) {
	const testWrapper = document.createElement('div');
	testWrapper.classList.add('grid');
	testWrapper.innerHTML =
		`
<vwc-audio></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>`;
	wrapper.appendChild(testWrapper);

	await vvdCore.settled;
}


