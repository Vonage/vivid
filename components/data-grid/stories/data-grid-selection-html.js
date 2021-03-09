import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<style>
		vwc-checkbox {
			vertical-align: middle;
		}
	</style>
	<vwc-data-grid .items="${args.items}">
		<vwc-data-grid-column selector="multi"></vwc-data-grid-column>
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
	</vwc-data-grid>
`;

export const SelectionHTML = Template.bind({});
SelectionHTML.args = {
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 10000)
};
