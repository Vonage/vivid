import '@vonage/vwc-circular-progress';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
		<vwc-circular-progress progress="0.7"></vwc-circular-progress>
		<vwc-circular-progress progress="0.3" density="-3"></vwc-circular-progress>
		<vwc-circular-progress progress="0.5" connotation="cta"></vwc-circular-progress>
		<vwc-circular-progress progress="0.2" connotation="success"></vwc-circular-progress>
		<vwc-circular-progress progress="0.9" connotation="alert"></vwc-circular-progress>
	`;
	wrapper.appendChild(elementWrapper);
}


