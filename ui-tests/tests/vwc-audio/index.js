import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-audio';

export async function createElementVariations(wrapper) {
	const testWrapper = document.createElement('div');
	wrapper.classList.add('grid');
	testWrapper.classList.add('grid');
	testWrapper.innerHTML =
		`
<vwc-audio></vwc-audio>
<vwc-audio connotation="primary"></vwc-audio>
<vwc-audio timestamp></vwc-audio>
<vwc-audio timestamp connotation="primary"></vwc-audio>
<vwc-audio noseek="true"></vwc-audio>
<vwc-audio disabled connotation="primary"></vwc-audio>
<vwc-audio disabled connotation="cta" timestamp></vwc-audio>
`;
	wrapper.appendChild(testWrapper);

	await vvdCore.settled;
}


