import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-empty-state';


export async function createElementVariations(wrapper) {
	const emptyStateElementWrapper = document.createElement('div');
	emptyStateElementWrapper.innerHTML = `
		<vwc-empty-state icon="chat-line" heading="Empty State Title" body="Empty state body for more information"></vwc-empty-state>
	`;
	wrapper.appendChild(emptyStateElementWrapper);

	await vvdCore.settled;
}


