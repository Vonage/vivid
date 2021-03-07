import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';
import {
	getControlsSegment,
} from './data-grid-columns-js';

const Template = args => html`
	${getControlsSegment()}
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