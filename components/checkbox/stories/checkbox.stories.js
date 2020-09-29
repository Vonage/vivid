import '@vonage/vwc-checkbox/vwc-checkbox.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Checkbox',
	component: 'vwc-checkbox',
	argTypes
}

const Template = ({ label, ...args }) => html`
	<vwc-formfield label=${label}>
		<vwc-checkbox ...=${spread(args)}></vwc-checkbox>
	</vwc-formfield>`;

export const Default = Template.bind({});
Default.args = { label: 'Use email' };

export const Checked = Template.bind({});
Checked.args = { label: 'SMS auth enabled', checked: '' };

export const Indeterminate = Template.bind({});
Indeterminate.args = { label: 'Phone number publicly visible', indeterminate: '' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'London', disabled: '', checked: '' };

// TODO: error example

// export const basic = () => html`
// 	<h3>Disabled</h3>
// 	<vwc-formfield label="London">
// 		<vwc-checkbox disabled></vwc-checkbox>
// 	</vwc-formfield>
// 	<vwc-formfield label="Moscow">
// 		<vwc-checkbox disabled checked></vwc-checkbox>
// 	</vwc-formfield>
// 	<vwc-formfield label="Tel Aviv">
// 		<vwc-checkbox disabled indeterminate></vwc-checkbox>
// 	</vwc-formfield>
// `;
