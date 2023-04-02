import '@vonage/vwc-menu';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import '@vonage/vwc-list/vwc-check-list-item';
import '@vonage/vwc-list/vwc-radio-list-item';
import '@vonage/vwc-icon';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
<style>
.list-item {
	width: 150px;
}
</style>
		<vwc-menu menucorner="START" corner="BOTTOM_LEFT" open="true">
			<vwc-list-item class="list-item" graphic="icon" hasmeta="">
				Dominant
				<vwc-icon slot="graphic" type="layout-1-line" size="small"></vwc-icon>
			</vwc-list-item>
			<vwc-list-item class="list-item" graphic="icon" hasmeta="">
				 Audience
				<vwc-icon slot="graphic" type="layout-2-line" size="small"></vwc-icon>
			</vwc-list-item>
			<vwc-list-item class="list-item"  graphic="icon" hasmeta="">
				 Gallery
				<vwc-icon slot="graphic" type="apps-line" size="small"></vwc-icon>
				<vwc-icon slot="meta" type="check-line" size="small"></vwc-icon>
			</vwc-list-item>
		</vwc-menu>
		`;
	wrapper.appendChild(textElementWrapper);
}


