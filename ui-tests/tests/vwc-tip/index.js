import '@vonage/vwc-tip';

export async function createElementVariations(wrapper) {
	const tipElementWrapper = document.createElement('div');
	tipElementWrapper.innerHTML =
		`
		 <vwc-tip content="lalala"></vwc-tip>
		 <vwc-tip icon="info-line" content="lalala"></vwc-tip>
		 <vwc-tip open content="lalala"></vwc-tip>
		 <vwc-tip open dismissible content="lalala"></vwc-tip>
		`;
	wrapper.appendChild(tipElementWrapper);
}


