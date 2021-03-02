import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<div class="sort-controls">
		<vwc-formfield label="First Name sortable">
			<vwc-checkbox class="fn-sortable" @change="${sortableToggle}"></vwc-checkbox>
		</vwc-formfield>
		<vwc-formfield label="Last Name sortable">
			<vwc-checkbox class="ln-sortable" @change="${sortableToggle}"></vwc-checkbox>
		</vwc-formfield>
		<vwc-formfield label="Multisort">
			<vwc-checkbox class="multi-sort"></vwc-checkbox>
		</vwc-formfield>
	</div>
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}">
	</vwc-data-grid>
`;

export const SortJavascript = Template.bind({});
SortJavascript.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function sortableToggle(e) {
	const v = e.target.checked;
	if (e.target.classList.contains('fn-sortable')) {
		SortJavascript.args.columns[0].sortable = v;
	} else {
		SortJavascript.args.columns[1].sortable = v;
	}
	document.querySelector('vwc-data-grid').columns = SortJavascript.args.columns;
}