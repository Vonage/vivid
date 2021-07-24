import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-hero';


export async function createElementVariations(wrapper) {
	const heroElementWrapper = document.createElement('div');
	heroElementWrapper.innerHTML = `
		<vwc-hero icon="chat-line" heading="Empty State Title" body="Empty state body for more information"></vwc-hero>
	`;
	wrapper.appendChild(heroElementWrapper);

	await vvdCore.settled;
}


