import '@vonage/vwc-dropdown';
import '@vonage/vwc-button';
import '@vonage/vwc-data-grid';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
	<style>
		html {
			min-block-size: 100%;
		}
		body {
			min-block-size: 100%;
		}
		#data-grid {
			padding: 8px;
		}
	</style>
	<div style="position: relative">
		<vwc-button id="button" label="Open dropdown" @click="${anchorClickHandler}" icon="chevron-down-line" trailingicon></vwc-button>
		<vwc-dropdown id="dropdown" ...=${spread(args)} @opened="${onOpen}">
			<vwc-textfield slot="header" placeholder="Search..." icon="search-line" dense></vwc-textfield>
			<vwc-data-grid id="data-grid">
				<vwc-data-grid-column class="selector" selector="multi"></vwc-data-grid-column>
				<vwc-data-grid-column path="label" header="Entity ID"></vwc-data-grid-column>
			</vwc-data-grid>
			<vwc-button slot="actions" @click="${actionClickHandler}">Cancel</vwc-button>
			<vwc-button slot="actions" layout="filled" @click="${actionClickHandler}">Done</vwc-button>
		</vwc-dropdown>
	</div>
`;

export const DataGrid = Template.bind({});
DataGrid.args = {
	corner: 'BOTTOM_START'
};

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const dropdown = document.querySelector('#dropdown');
	dropdown.anchor = anchor;
	dropdown.open = true;
}

function onOpen() {
	const dataGrid = dropdown.querySelector('#data-grid');
	dataGrid.items = (new Array(1000)).fill(0).map((v, i) => {
		return {
			label: `Item ${i}`
		};
	});
}

function actionClickHandler() {
	const dropdown = document.querySelector('#dropdown');
	dropdown.open = false;
}
