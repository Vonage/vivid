import '@vonage/vwc-side-drawer';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon/vwc-icon.js';
import { snapshotTheWholePage } from '../../utils/testPageUtils';
import { pageContentMock } from '../../../scripts/storybook/svg_templates';

export async function createElementVariations(wrapper) {
	snapshotTheWholePage(wrapper);
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
	<style>
		div#demo {
			position: relative;
			display: flex;
			width: 1060px;
			height: 540px;
			margin: 10px;
			border-radius: 10px;
			overflow: hidden;
			box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
			border: solid 1px #ccc;
		}
		vwc-side-drawer#side-drawer {
			height: inherit;
			--side-drawer-background-color: var(--vvd-color-neutral-10);
		}
	</style>

	<div id="demo">
		<vwc-side-drawer id="side-drawer" position="end">
		<div>
			<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
				</vwc-list-item>
				<p>
					<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
				</p>
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>
				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-expansion-panel open>
						<vwc-list-item slot="header" shape="rounded">2nd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
					</vwc-list-expansion-panel>
				</vwc-list-expansion-panel>
				<p>
					<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
				</p>
				<vwc-list-expansion-panel>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
				</vwc-list-expansion-panel>
			</vwc-list>
		</div>
		<div slot="app-content">		
			${pageContentMock()}
		</div>
	</vwc-side-drawer>
	</div>

	<div id="demo">
		<vwc-side-drawer id="side-drawer" alternate hasTopBar>
		<div slot="top-bar">
			<vwc-icon type="vonage-mono"></vwc-icon>
			<vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
		</div>
		<div>
			<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
				</vwc-list-item>
				<p>
					<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
				</p>
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>
				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-expansion-panel open>
						<vwc-list-item slot="header" shape="rounded">2nd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
					</vwc-list-expansion-panel>
				</vwc-list-expansion-panel>
				<p>
					<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
				</p>
				<vwc-list-expansion-panel>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
				</vwc-list-expansion-panel>
			</vwc-list>
		</div>
		<div slot="app-content">		
			${pageContentMock()}
		</div>
	</vwc-side-drawer>
	</div>
`;
	wrapper.appendChild(elementWrapper);
}


