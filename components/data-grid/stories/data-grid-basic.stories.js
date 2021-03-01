import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Components/Composite/DataGrid',
	component: 'vwc-data-grid',
}

const Template = args => html`
	<vwc-data-grid .configuration="${args.config}" .items="${args.items}">
	</vwc-data-grid>
`;

export const Basic = Template.bind({});
Basic.args = {
	config: {
		columns: [
			{ header: 'First Name', path: 'fname', sortable: true },
			{ header: 'Last Name', path: 'lname' }
		]
	},
	items: Array(100000).fill(0).map((v, i) => {
		return { fname: `A${i}`, lname: `B${i}` };
	})
};