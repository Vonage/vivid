import '@vonage/vwc-tooltip';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.id = 'card-wrapper';
	elementWrapper.innerHTML = `
		<style>

		</style>
		<vwc-tooltip tooltipTitle="I'm the tooltip Title" tooltiptext="Large tooltip - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."></vwc-tooltip>
		<vwc-tooltip tooltipTitle="I'm the tooltip Title" tooltiptext="Large tooltip - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." dense></vwc-tooltip>
		<vwc-tooltip tooltipTitle="I’m a Dense tooltip" tooltiptext="" dense></vwc-tooltip>
		`;
	wrapper.appendChild(elementWrapper);
}
