import '@vonage/vwc-tooltip';

export async function createElementVariations(wrapper) {
	const tipElementWrapper = document.createElement('div');
	tipElementWrapper.innerHTML =
		`
		 <vwc-tooltip content="I'm a tooltip" open></vwc-tooltip>
		 <vwc-tooltip content="I'm a tooltip" dismissible open></vwc-tooltip>
		`;
	wrapper.appendChild(tipElementWrapper);
}


