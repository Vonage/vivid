import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .dataProvider="${dataProvider}">
	</vwc-data-grid>
`;

export const DataStreamJS = Template.bind({});
DataStreamJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' },
	]
};

const dataSourceSimulated = sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000);
function dataProvider(params, callback) {
	const startIndex = params.page * params.pageSize;
	const pageItems = dataSourceSimulated.slice(startIndex, startIndex + params.pageSize);
	callback(pageItems, dataSourceSimulated.length);
}