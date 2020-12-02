import '@vonage/vwc-icon-button/vwc-icon-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/IconButton',
	component: 'vwc-icon-button',
	argTypes
};

const Template = args => html`<vwc-icon-button ...=${spread(args)}></vwc-icon-button>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'bin' };

export const Dense = Template.bind({});
Dense.args = { icon: 'home', dense: true };

export const Enlarged = Template.bind({});
Enlarged.args = { icon: 'home', enlarged: true };

export const Disabled = Template.bind({});
Disabled.args = { icon: 'code', disabled: true };