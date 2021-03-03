import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}">
	</vwc-data-grid>
`;

export const FooterJavascript = Template.bind({});
FooterJavascript.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname', footerRenderer: lNameFooter }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function lNameFooter() {
	console.log(arguments);
}