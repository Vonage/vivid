import '@vonage/vwc-switch';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
		<vwc-switch></vwc-switch>
		<vwc-switch checked></vwc-switch>
		<vwc-switch checked connotation="cta" enlarged></vwc-switch>
		<vwc-switch checked connotation="success"></vwc-switch>
	`;
	wrapper.appendChild(elementWrapper);
}


