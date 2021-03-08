import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';
import { cellRenderer, expandedRowRenderer } from './data-grid-basic-js';

const Template = args => html`
	<style>
		vwc-checkbox {
			vertical-align: middle;
		}
	</style>
	<vwc-data-grid .items="${args.items}" .rowDetailsRenderer="${expandedRowRenderer}">
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
		<vwc-data-grid-column header="Expand Row" .cellRenderer="${cellRenderer}"></vwc-data-grid-column>
	</vwc-data-grid>
`;

export const BasicHTML = Template.bind({});
BasicHTML.args = {
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};
