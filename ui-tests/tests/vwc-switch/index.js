import '@vonage/vwc-switch';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
<style>
	.grid {
	display: grid;
	grid-template-columns: repeat(6, 60px);
	gap: 1rem;
	background-color: var(--vvd-color-canvas);
	padding: 1rem;
	margin-bottom: 2rem;
	}
</style>
<div class="grid ">
		<vwc-switch></vwc-switch>
		<vwc-switch checked></vwc-switch>
		<vwc-switch disabled></vwc-switch>
		<vwc-switch checked disabled></vwc-switch>
		<vwc-switch enlarged></vwc-switch>
		<vwc-switch checked  enlarged></vwc-switch>

		<vwc-switch connotation="cta"></vwc-switch>
		<vwc-switch connotation="cta" checked></vwc-switch>
		<vwc-switch connotation="cta" disabled></vwc-switch>
		<vwc-switch connotation="cta" checked disabled></vwc-switch>
		<vwc-switch connotation="cta" enlarged></vwc-switch>
		<vwc-switch connotation="cta" checked  enlarged></vwc-switch>

		<vwc-switch connotation="success"></vwc-switch>
		<vwc-switch connotation="success" checked></vwc-switch>
		<vwc-switch connotation="success" disabled></vwc-switch>
		<vwc-switch connotation="success" checked disabled></vwc-switch>
		<vwc-switch connotation="success" enlarged></vwc-switch>
		<vwc-switch connotation="success" checked  enlarged></vwc-switch>

		<vwc-switch connotation="alert"></vwc-switch>
		<vwc-switch connotation="alert" checked></vwc-switch>
		<vwc-switch connotation="alert" disabled></vwc-switch>
		<vwc-switch connotation="alert" checked disabled></vwc-switch>
		<vwc-switch connotation="alert" enlarged></vwc-switch>
		<vwc-switch connotation="alert" checked  enlarged></vwc-switch>

		</div>
		<div class="grid vvd-scheme-alternate">
		<vwc-switch></vwc-switch>
		<vwc-switch checked></vwc-switch>
		<vwc-switch disabled></vwc-switch>
		<vwc-switch checked disabled></vwc-switch>
		<vwc-switch enlarged></vwc-switch>
		<vwc-switch checked  enlarged></vwc-switch>

		<vwc-switch connotation="cta"></vwc-switch>
		<vwc-switch connotation="cta" checked></vwc-switch>
		<vwc-switch connotation="cta" disabled></vwc-switch>
		<vwc-switch connotation="cta" checked disabled></vwc-switch>
		<vwc-switch connotation="cta" enlarged></vwc-switch>
		<vwc-switch connotation="cta" checked  enlarged></vwc-switch>

		<vwc-switch connotation="success"></vwc-switch>
		<vwc-switch connotation="success" checked></vwc-switch>
		<vwc-switch connotation="success" disabled></vwc-switch>
		<vwc-switch connotation="success" checked disabled></vwc-switch>
		<vwc-switch connotation="success" enlarged></vwc-switch>
		<vwc-switch connotation="success" checked  enlarged></vwc-switch>

		<vwc-switch connotation="alert"></vwc-switch>
		<vwc-switch connotation="alert" checked></vwc-switch>
		<vwc-switch connotation="alert" disabled></vwc-switch>
		<vwc-switch connotation="alert" checked disabled></vwc-switch>
		<vwc-switch connotation="alert" enlarged></vwc-switch>
		<vwc-switch connotation="alert" checked  enlarged></vwc-switch>

		</div>
	`;
	wrapper.appendChild(elementWrapper);
}


