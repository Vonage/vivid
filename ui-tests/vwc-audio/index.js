import { VWCAudio } from '@vonage/vwc-audio';

VWCAudio;

const ELEMENT_NAME = 'vwc-audio';

export function createElementVariations(wrapper) {
	const audioElement = document.createElement(ELEMENT_NAME);
	wrapper.appendChild(audioElement);
}


