import '@vonage/vwc-select/vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Select',
	component: 'vwc-select',
	argTypes
}

const Template = (args) => html`
	<style>
		html, body {
			height: 100%;
		}
	</style>
	<vwc-select ...=${spread(args)} @selected=${onSelected}>
		<vwc-list-item></vwc-list-item>
		<vwc-list-item value="0">Item 0</vwc-list-item>
		<vwc-list-item value="1">Item 1</vwc-list-item>
		<vwc-list-item value="2">Item 2</vwc-list-item>
		<vwc-list-item value="3">Item 3</vwc-list-item>
	</vwc-select>`;

export const Default = Template.bind({});
Default.args = { label: 'VWC Select', helper: 'Helper Text' };

export const Dense = Template.bind({});
Dense.args = { dense: '', label: 'VWC Select' };

export const DenseNoLabel = Template.bind({});
DenseNoLabel.args = { dense: '' };

export const PillAutoDense = Template.bind({});
PillAutoDense.args = { shape: 'pill', label: 'VWC Select' };

export const GhostLayoutAutoDense = Template.bind({});
GhostLayoutAutoDense.args = { ghost: '', label: 'VWC Select' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '', label: 'VWC Select', helper: 'Helper Text' };

export const Required = Template.bind({});
Required.args = { required: '', label: 'VWC Select', helper: 'Select your preference', validationMessage: 'This Field is Required' };

export const Autofocus = Template.bind({});
Autofocus.args = { label: 'VWC Select', helper: 'Select your preference', autofocus: true };

function onSelected(e) {
	console.log(e);
}
