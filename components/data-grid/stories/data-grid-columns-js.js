import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<div class="column-controls">
		<vwc-formfield label="Reordering">
			<vwc-checkbox class="multi-sort" @change="${reorderingToggle}"></vwc-checkbox>
		</vwc-formfield>
		<vwc-formfield label="First Name resizable">
			<vwc-checkbox class="fn-resizable" @change="${resizableToggle}"></vwc-checkbox>
		</vwc-formfield>
		<vwc-formfield label="Last Name resizable">
			<vwc-checkbox class="ln-resizable" @change="${resizableToggle}"></vwc-checkbox>
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

function reorderingToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	grid.reordering = v;
}

function resizableToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-resizable')) {
		grid.columns[0].resizable = v;
	} else {
		grid.columns[1].resizable = v;
	}
	grid.requestUpdate();
}