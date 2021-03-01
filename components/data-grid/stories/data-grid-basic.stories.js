import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Components/Composite/DataGrid',
	component: 'vwc-data-grid',
}

const Template = args => html`
	<vwc-data-grid></vwc-data-grid>
`;

export const Basic = Template.bind({});
Basic.args = {};
