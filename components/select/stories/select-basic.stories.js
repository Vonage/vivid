import '@vonage/vwc-select/vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Select',
	component: 'vwc-select',
	argTypes
}

const Template = (args) => html`
	<vwc-select ...=${spread(args)} @selected=${onSelected}>
		<vwc-list-item></vwc-list-item>
		<vwc-list-item value="0">Item 0</vwc-list-item>
		<vwc-list-item value="1">Item 1</vwc-list-item>
		<vwc-list-item value="2">Item 2</vwc-list-item>
		<vwc-list-item value="3">Item 3</vwc-list-item>
		<vwc-list-item noninteractive>
			<vwc-button unelevated style="cursor: inherit; pointer-events: auto;">Click me</vwc-button>
		</vwc-list-item>
	</vwc-select>`;

export const Default = Template.bind({});
Default.args = { outlined: '', label: 'VWC Select', helper: 'Helper Text' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '', outlined: '', label: 'VWC Select', helper: 'Helper Text' };

export const Required = Template.bind({});
Required.args = { required: '', outlined: '', label: 'VWC Select', validationMessage: 'This Field is Required' };

function onSelected(e) {
	console.log(e);
}
