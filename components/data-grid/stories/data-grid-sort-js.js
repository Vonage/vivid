import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<style>
		.sort-controls {
			display: flex;
			justify-content: space-between;
		}
	</style>
	<div class="sort-controls">
		<vwc-formfield label="Multisort">
			<vwc-checkbox class="multi-sort" @change="${multisortToggle}"></vwc-checkbox>
		</vwc-formfield>
		<div>
			<vwc-formfield label="First Name sortable">
				<vwc-checkbox class="fn-sortable" @change="${sortableToggle}"></vwc-checkbox>
			</vwc-formfield>
			<vwc-formfield label="Last Name sortable">
				<vwc-checkbox class="ln-sortable" @change="${sortableToggle}"></vwc-checkbox>
			</vwc-formfield>
		</div>
	</div>
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}">
	</vwc-data-grid>
`;

export const SortJS = Template.bind({});
SortJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function multisortToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	grid.multiSort = v;
}

function sortableToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-sortable')) {
		grid.columns[0].sortable = v;
	} else {
		grid.columns[1].sortable = v;
	}
	grid.refreshConfiguration();
}