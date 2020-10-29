import '@vonage/vwc-radio/vwc-radio.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Radio',
	component: 'vwc-radio',
	argTypes
}

const Template = args => html`
	<vwc-formfield label="London">
		<vwc-radio name="group-a" value="value1" ...=${spread(args)}></vwc-radio>
	</vwc-formfield>
	<vwc-formfield label="New York">
		<vwc-radio name="group-a" value="value2" ...=${spread(args)}></vwc-radio>
	</vwc-formfield>`;

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = { checked: '' };

export const Disabled = Template.bind({});
Disabled.args = { checked: '', disabled: '' };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };
