import '@vonage/vwc-fab';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-fab icon="store"></vwc-fab>
		<vwc-fab icon="store" mini></vwc-fab>
		<vwc-fab icon="wallet" label="Add to cart" extended></vwc-fab>
		<vwc-fab icon="store" connotation="primary"></vwc-fab>
		<vwc-fab icon="store" connotation="cta"></vwc-fab>
		`;
	wrapper.appendChild(textElementWrapper);
}


