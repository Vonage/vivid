import '@vonage/vwc-checkbox/vwc-checkbox.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Checkbox',
	component: 'vwc-checkbox',
	argTypes
};

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

export const Autofocus = Template.bind({});
Autofocus.args = { label: 'Use email', autofocus: true };
