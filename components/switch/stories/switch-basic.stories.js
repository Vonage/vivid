import '@vonage/vwc-switch/vwc-switch.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Switch',
	component: 'vwc-switch',
	argTypes
};

const Template = args => html`<vwc-switch ...=${spread(args)}></vwc-switch>`;

export const Basic = Template.bind({});
Basic.args = { checked: '' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { enlarged: '' };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };
