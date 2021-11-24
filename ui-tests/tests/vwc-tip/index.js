import '@vonage/vwc-tip';

export async function createElementVariations(wrapper) {
	const tipElementWrapper = document.createElement('div');
	tipElementWrapper.innerHTML =
		`
		 <vwc-tip></vwc-tip>
		 <vwc-tip icon="info-line"></vwc-tip>
		`;
	wrapper.appendChild(tipElementWrapper);
}


