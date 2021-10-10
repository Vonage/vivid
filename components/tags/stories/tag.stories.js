import '@vonage/vwc-tags/vwc-tag.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Tag',
	component: 'vwc-tag',
	argTypes
};

const Template = args => html`<vwc-tag ...=${spread(args)}></vwc-tag>`;

export const Basic = Template.bind({});
Basic.args = { text: 'Basic' };

export const Enlarged = Template.bind({});
Enlarged.args = { text: 'Enlarged',	enlarged: true };

export const Dense = Template.bind({});
Dense.args = { text: 'Dense',	dense: true };

export const Outlined = Template.bind({});
Outlined.args = { text: 'Outlined',	layout: 'outlined' };

export const Selected = Template.bind({});
Selected.args = { text: 'Selected', filter: true, selected: true };
