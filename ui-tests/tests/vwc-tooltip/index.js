import '@vonage/vwc-tooltip';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<style>
			.tooltip-wrapper {
				height: 600px;
				width: 600px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		</style>
		<div class="tooltip-wrapper">
			<vwc-icon-button icon="info-line"  shape="circled" aria-describedby="tooltip" aria-haspopup="true" id="button"></vwc-icon-button>
			<vwc-tooltip open icon="info-line" text="I'm the tooltip content" dismissible style="--tooltip-inline-size:300px;" id="tooltip" corner="top" anchor="button"></vwc-tooltip>
		</div>`;

	wrapper.appendChild(textElementWrapper);
	const button = document.getElementById("button");
	button.addEventListener("click", onClick);
	const tooltip = document.getElementById('tooltip');
	await tooltip.updateComplete;
	return tooltip.updateComplete;
}

function onClick() {
	const tooltip = document.querySelector('vwc-tooltip');
	if (tooltip.open) {
		tooltip.hide();
	} else {
		tooltip.show();
	}
}
