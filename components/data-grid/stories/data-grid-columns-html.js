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
	<vwc-data-grid .items="${args.items}">
		<vwc-data-grid-column path="fname" header="First Name" auto-width></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name" auto-width></vwc-data-grid-column>
		<vwc-data-grid-column path="wname" header="W Name" width="300px"></vwc-data-grid-column>
		<vwc-data-grid-column path="xname" header="X Name" width="30%"></vwc-data-grid-column>
		<vwc-data-grid-column path="yname" header="Y Name" width="30em"></vwc-data-grid-column>
		<vwc-data-grid-column path="zname" header="Z Name" width="300px"></vwc-data-grid-column>
	</vwc-data-grid>
`;

export const ColumnsCustomizationHTML = Template.bind({});
ColumnsCustomizationHTML.args = {
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
		grid.children[0].resizable = v;
	} else {
		grid.children[1].resizable = v;
	}
}

function hiddenToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-hidden')) {
		grid.children[0].hidden = v;
	} else {
		grid.children[1].hidden = v;
	}
}

function frozenToggle(e) {
	const v = e.target.checked;
	const grid = document.querySelector('vwc-data-grid');
	if (e.target.classList.contains('fn-frozen')) {
		grid.children[0].frozen = v;
	} else {
		grid.children[1].frozen = v;
	}
}