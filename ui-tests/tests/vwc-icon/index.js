import '@vonage/vwc-icon';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
		<vwc-icon type="end-call-line"></vwc-icon>
		<vwc-icon type="check-circle-solid"></vwc-icon>
		<vwc-icon type="store-solid" connotation="cta" size="small"></vwc-icon>
		<vwc-icon type="cart-solid" connotation="success" size="medium"></vwc-icon>
		<vwc-icon type="headset-line" connotation="alert" size="large"></vwc-icon>
	`;
	wrapper.appendChild(elementWrapper);
}


