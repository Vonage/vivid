import '@vonage/vwc-dropdown';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';

const Template = args => html`
	<style>
		html {
			min-block-size: 100%;
		}
		body {
			min-block-size: 100%;
		}
	</style>
	<div style="position: relative">
		<vwc-button id="button" label="Open dropdown" @click="${anchorClickHandler}" icon="chevron-down-line" trailingicon></vwc-button>
		<vwc-dropdown id="dropdown" ...=${spread(args)}>
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
			<vwc-button slot="actions" @click="${actionClickHandler}">Cancel</vwc-button>
			<vwc-button slot="actions" layout="filled" @click="${actionClickHandler}">Done</vwc-button>
		</vwc-dropdown>
	</div>
`;

export const Basic = Template.bind({});
Basic.args = {
	corner: 'BOTTOM_START'
};

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const dropdown = document.querySelector('#dropdown');
	dropdown.anchor = anchor;
	dropdown.open = true;
}

function actionClickHandler() {
	const dropdown = document.querySelector('#dropdown');
	dropdown.open = false;
}

document.addEventListener('DOMContentLoaded', anchorClickHandler, false);
