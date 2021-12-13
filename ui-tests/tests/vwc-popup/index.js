import '../../../components/popup/vwc-popup';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-popup>Rachel</vwc-popup>
		<vwc-popup tail dismissible><div style="height: 100px; width: 100px; background-color: #660000;"></div></vwc-popup>
		`;
	wrapper.appendChild(textElementWrapper);
}


