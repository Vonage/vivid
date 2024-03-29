import '@vonage/vwc-popup';
import '@vonage/vwc-button';
import '@vonage/vwc-text';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
	<style>
	.popup-wrapper {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--vvd-color-neutral-10);
	}
	.content {
		width: 200px;
		text-align: left;
		padding: 1rem;
	}
	.line {
		border-bottom: 1px solid var(--vvd-color-neutral-40);
		padding-bottom: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
<div class="popup-wrapper">
	<vwc-button id="buttonAnchor" layout="outlined" outlined aria-haspopup="true" aria-describedby="popup">Click to open popup</vwc-button>
	<vwc-popup id="popup" open corner="left" dismissible anchor="buttonAnchor">
		<div class="content">
			<vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
			<vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
		</div>
	</vwc-popup>
	<vwc-popup arrow alternate corner="right" id="popup" open anchor="buttonAnchor">
		<div class="content">
			<vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
			<vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
		</div>
	</vwc-popup>
</div>`;
wrapper.appendChild(textElementWrapper);

}
