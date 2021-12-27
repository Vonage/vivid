import '@vonage/vwc-popup';
import '@vonage/vwc-button';
import '@vonage/vwc-text';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<style>
			.popup-wrapper {
				width: 100%;
				height: 200px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--vvd-color-neutral-10);
			}
		</style>
		<div class="popup-wrapper">
			<vwc-button id="button" layout="outlined" outlined aria-describedby="popup">Click to open popup</vwc-button>
			<vwc-popup id="popup" corner="right" arrow><slot><vwc-text>I'm popup</vwc-text></slot></vwc-popup>
		</div>`;

	wrapper.appendChild(textElementWrapper);
	const button = document.getElementById("button");
	button.addEventListener("click", onClick);
}

function onClick() {
	const popup = document.querySelector("vwc-popup");
	const button = document.querySelector("#button");
	if (popup.open) {
		popup.hide();
	} else {
		popup.anchor = button;
		popup.show();
	}
}
