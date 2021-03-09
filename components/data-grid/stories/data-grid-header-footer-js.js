import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}">
	</vwc-data-grid>
`;

export const HeaderFooterJS = Template.bind({});
HeaderFooterJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname', headerRenderer: fNameHeader, footer: 'Totals:' },
		{ header: 'Last Name', path: 'lname', footerRenderer: lNameFooter }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function fNameHeader(column, container) {
	container.innerHTML = `<span style="font-weight: 600">${column.header} (customized)</span>`
}

function lNameFooter(column, container) {
	container.innerHTML = `<span style="font-weight: 600">Total: ${HeaderFooterJS.args.items.length}</span>`;
}