import '@vonage/vwc-data-grid';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<style>
		vwc-checkbox {
			vertical-align: middle;
		}
	</style>
	<div class="controls">
		<vwc-button layout="outlined" @click="${selectAll}">Select all (API)</vwc-button>
		<vwc-button layout="outlined" @click="${deselectAll}">Deselect all (API)</vwc-button>
	</div>
	<vwc-data-grid .items="${args.items}" @selected-items-changed="${onSelect}">
		<vwc-data-grid-column selector="multi"></vwc-data-grid-column>
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
	</vwc-data-grid>
	<p>
		<span>Total selected: </span><span class="selected-count">0</span>
	</p>
`;

export const SelectionHTML = Template.bind({});
SelectionHTML.args = {
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 10000)
};

function onSelect(e) {
	document.querySelector('.selected-count').textContent = e.target.selectedItems.length;
}

function selectAll() {
	document.querySelector('vwc-data-grid').selectAll();
}

function deselectAll() {
	document.querySelector('vwc-data-grid').deselectAll();
}