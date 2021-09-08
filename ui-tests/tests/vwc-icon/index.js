import '@vonage/vwc-icon';
import '@vonage/vwc-text';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
		<vwc-icon type="end-call-line"></vwc-icon>
		<vwc-icon type="check-circle-solid"></vwc-icon>
		<vwc-icon type="store-solid" connotation="cta" size="small"></vwc-icon>
		<vwc-icon type="cart-solid" connotation="success" size="medium"></vwc-icon>
		<vwc-icon type="headset-line" connotation="alert" size="large"></vwc-icon>
		<vwc-text font-face="body-1">
			<p>
				you gotta
				<vwc-icon type="heart-solid" connotation="success" inline></vwc-icon>
				components
			</p>
		</vwc-text>
	`;
	wrapper.appendChild(elementWrapper);
}


