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
		{ header: 'First Name', path: 'fname', headerRenderer: fNameHeader },
		{ header: 'Last Name', path: 'lname', footerRenderer: lNameFooter }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function fNameHeader(container) {
	console.log(arguments);
}

function lNameFooter(container) {
	container.textContent = `Total: ${FooterJS.args.items.length}`;
}