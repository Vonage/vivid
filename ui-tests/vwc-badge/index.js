import { VWCAudio } from '@vonage/vwc-audio';

VWCAudio;

const ELEMENT_NAME = 'vwc-audio';

export function createElementVariations(wrapper) {
	const audioElementWrapper = document.createElement('div');
	audioElementWrapper.innerHTML =
		`
<vwc-audio></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>`;
	wrapper.appendChild(audioElementWrapper);
}


