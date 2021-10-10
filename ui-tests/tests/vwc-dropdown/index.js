import { snapshotTheWholePage } from '../../utils/testPageUtils';
import '@vonage/vwc-dropdown';
import '@vonage/vwc-button';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-check-list-item.js';

export async function createElementVariations(wrapper) {
	function anchorClickHandler() {
		dropdown.anchor = anchor;
		dropdown.open = true;
	}

	function actionClickHandler() {
		dropdown.open = false;
	}

	snapshotTheWholePage(wrapper);

	wrapper.innerHTML = `
	<style>
		html {
			min-block-size: 100%;
		}
		body {
			min-block-size: 100%;
		}
	</style>
	<div style="position: relative">
		<vwc-button id="button" label="Open dropdown" onclick="anchorClickHandler" icon="chevron-down-line" trailingicon></vwc-button>
		<vwc-dropdown id="dropdown" corner="BOTTOM_START">
			<vwc-textfield slot="header" placeholder="Search..." icon="search-line" dense></vwc-textfield>
			<vwc-list multi>
				<vwc-check-list-item left>
					Basic item 1
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 2
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 3
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 4
				</vwc-check-list-item>
			</vwc-list>
			<vwc-button slot="actions" onclick="actionClickHandler">Cancel</vwc-button>
			<vwc-button slot="actions" layout="filled" onclick="actionClickHandler">Done</vwc-button>
		</vwc-dropdown>
	</div>
`;

	const dropdown = wrapper.querySelector('#dropdown');
	const anchor = wrapper.querySelector('#button');

	anchorClickHandler();

	return dropdown.updateComplete;
}
