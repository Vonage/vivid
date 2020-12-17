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

export const Filled = Template.bind({});
Filled.args = { icon: 'bin', layout: 'filled' };

export const Outlined = Template.bind({});
Outlined.args = { icon: 'bin', layout: 'outlined' };

export const CircledShape = Template.bind({});
CircledShape.args = { icon: 'bin', shape: 'circled', layout: 'filled' };

export const Dense = Template.bind({});
Dense.args = { icon: 'home', dense: true, layout: 'filled' };

export const Enlarged = Template.bind({});
Enlarged.args = { icon: 'home', enlarged: true, layout: 'filled' };

export const Disabled = Template.bind({});
Disabled.args = { icon: 'code', disabled: true, layout: 'filled' };