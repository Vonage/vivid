import '@vonage/vwc-side-drawer';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon/vwc-icon.js';
import { snapshotTheWholePage } from '../../utils/testPageUtils';

export async function createElementVariations(wrapper) {
	snapshotTheWholePage(wrapper);
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
	<style>
		div#demo {
			position: relative;
			display: flex;
			width: 960px;
			height: 400px;
			margin: 10px;
			background-color: #eee;
			border-radius: 10px;
			overflow: hidden;
			box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
			border: solid 1px #ccc;
		}
		vwc-side-drawer#side-drawer {
			flex: 0 0 auto;
			height: 100%;
		}
		div#default {
			padding: 20px;
			width: 960px;
			background-image: url("data:image/svg+xml,%3Csvg width='782' height='754' viewBox='0 0 782 754' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='782' height='754' fill='%23F2F2F2'/%3E%3Crect x='23' y='80' width='733' height='248' rx='6' fill='white'/%3E%3Crect x='393' y='198' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='230' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='262' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='134' width='142' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='166' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='53' y='120' width='290' height='168' rx='6' fill='%23CCCCCC'/%3E%3Crect width='782' height='59' fill='%23E1E1E1'/%3E%3Crect x='23' y='16' width='500' height='28' rx='3' fill='%23C4C4C4'/%3E%3Ccircle cx='646' cy='30' r='14' fill='%23C4C4C4'/%3E%3Ccircle cx='694' cy='30' r='14' fill='%23C4C4C4'/%3E%3Ccircle cx='742' cy='30' r='14' fill='%23C4C4C4'/%3E%3Crect x='23' y='348' width='733' height='240' rx='6' fill='white'/%3E%3Crect x='90' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='90' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='319' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='319' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='548' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='548' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='70' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='298.667' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='527.333' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='23' y='608' width='733' height='125' rx='6' fill='white'/%3E%3Crect x='81' y='651' width='618' height='12' fill='%23B3B3B3'/%3E%3Crect x='81' y='683' width='618' height='12' fill='%23B3B3B3'/%3E%3C/svg%3E%0A");
			background-size: cover;
		}
	</style>


	<div>

	<div id="demo">
		<vwc-side-drawer id="side-drawer" alternate>
			<span slot="top-bar">
				<vwc-icon type="vonage-mono"></vwc-icon> VONAGE
			</span>

			<vwc-list
					innerRole="navigation"
					innerAriaLabel="Primary navigation"
					itemRoles="link"
				>
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
				</vwc-list-item>

				<p>SECTION TITLE</p>

				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>

				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-expansion-panel open>
						<vwc-list-item slot="header" shape="rounded"
							>2nd level item</vwc-list-item
						>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
					</vwc-list-expansion-panel>
				</vwc-list-expansion-panel>
			</vwc-list>

		</vwc-side-drawer>

		<div id="default"></div>
	</div>


	<div id="demo">
		<vwc-side-drawer id="side-drawer" hasTopBar type="modal" absolute open>
			<span slot="top-bar">
				<vwc-icon type="vonage-mono"></vwc-icon> VONAGE
			</span>

			<vwc-list
					innerRole="navigation"
					innerAriaLabel="Primary navigation"
					itemRoles="link"
				>
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
				</vwc-list-item>

				<p>SECTION TITLE</p>

				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
				</vwc-list-expansion-panel>
			</vwc-list>

		</vwc-side-drawer>

		<div id="default"></div>
	</div>

	</div>
`;
wrapper.appendChild(elementWrapper);
}

