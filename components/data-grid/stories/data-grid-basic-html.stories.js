import '@vonage/vwc-data-grid';
import { html } from 'lit-element';

export default {
	title: 'Components/Composite/DataGrid',
	component: 'vwc-data-grid',
}

const Template = args => html`
	<vwc-data-grid .items="${args.items}">
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
	</vwc-data-grid>
`;

export const BasicHTML = Template.bind({});
BasicHTML.args = {
	items: Array(100000).fill(0).map((_v, i) => {
		return { fname: `A${i}`, lname: `B${i}` };
	})
};