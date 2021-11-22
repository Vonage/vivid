import '@vonage/vwc-banner';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	const message = "test";
	textElementWrapper.innerHTML = `
	<vwc-banner open connotation="info" message=${message}></vwc-banner>
	<vwc-banner open connotation="announcement" message=${message}></vwc-banner>
	<vwc-banner open connotation="success" message=${message}></vwc-banner>
	<vwc-banner open connotation="warning" message=${message}></vwc-banner>
	<vwc-banner open connotation="alert" message=${message}></vwc-banner>
		`;
	wrapper.appendChild(textElementWrapper);
}


