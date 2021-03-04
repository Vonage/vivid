import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<style>
		.column-controls {
			display: flex;
			justify-content: space-between;
		}
	</style>
	<div class="column-controls">
		<vwc-formfield label="Reordering">
			<vwc-checkbox class="multi-sort" @change="${reorderingToggle}"></vwc-checkbox>
		</vwc-formfield>
		<div>
			<vwc-formfield label="First Name resizable">
				<vwc-checkbox class="fn-resizable" @change="${resizableToggle}"></vwc-checkbox>
			</vwc-formfield>
			<vwc-formfield label="Last Name resizable">
				<vwc-checkbox class="ln-resizable" @change="${resizableToggle}"></vwc-checkbox>
			</vwc-formfield>
		</div>
		<div>
			<vwc-formfield label="First Name hidden">
				<vwc-checkbox class="fn-hidden" @change="${hiddenToggle}"></vwc-checkbox>
			</vwc-formfield>
			<vwc-formfield label="Last Name hidden">
				<vwc-checkbox class="ln-hidden" @change="${hiddenToggle}"></vwc-checkbox>
			</vwc-formfield>
		</div>
		<div>
			<vwc-formfield label="First Name frozen">
				<vwc-checkbox class="fn-frozen" @change="${frozenToggle}"></vwc-checkbox>
			</vwc-formfield>
			<vwc-formfield label="Last Name frozen">
				<vwc-checkbox class="ln-frozen" @change="${frozenToggle}"></vwc-checkbox>
			</vwc-formfield>
		</div>
	</div>
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}">
	</vwc-data-grid>
`;

export const ColumnsCustomizationJS = Template.bind({});
ColumnsCustomizationJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname', autoWidth: true },
		{ header: 'Last Name', path: 'lname', autoWidth: true },
		{ header: 'W Name', path: 'wname', width: '200px' },
		{ header: 'X Name', path: 'xname', width: '200px' },
		{ header: 'Y Name', path: 'yname', width: '200px' },
		{ header: 'Z Name', path: 'zname', width: '200px' }
	],
	items: sequentalData({
		fname: 'A-{i}',
		lname: 'B-{i}',
		wname: 'W-{i}',
		xname: 'X-{i}',
		yname: 'Y-{i}',
		zname: 'Z-{i}'
	}, 100000)
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

function hiddenToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-hidden')) {
		grid.columns[0].hidden = v;
	} else {
		grid.columns[1].hidden = v;
	}
	grid.requestUpdate();
}

function frozenToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-frozen')) {
		grid.columns[0].frozen = v;
	} else {
		grid.columns[1].frozen = v;
	}
	grid.requestUpdate();
}