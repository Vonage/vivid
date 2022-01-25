import '@vonage/vwc-tooltip';

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
			<vwc-tooltip icon="info-line" content="I'm the tooltip content" dismissible style="--tooltip-min-inline-size:200px; --tooltip-max-inline-size:200px"></vwc-tooltip>
		</div>`;

	wrapper.appendChild(textElementWrapper);
}
