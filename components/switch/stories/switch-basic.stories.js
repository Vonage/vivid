import '@vonage/vwc-switch/vwc-switch.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Switch',
	component: 'vwc-switch',
	argTypes
}

const Template = args => html`<vwc-switch ...=${spread(args)}></vwc-switch>`;

export const Basic = Template.bind({});
Basic.args = { checked: '' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { enlarged: '' };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };