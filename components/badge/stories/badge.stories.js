import '@vonage/vwc-badge/vwc-badge.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Badge',
	component: 'vwc-badge',
	argTypes
};

const Template = args => html`<vwc-badge ...=${spread(args)}></vwc-badge>`;

export const Basic = Template.bind({});
Basic.args = { text: 'badge' };

export const WithIcons = Template.bind({});
WithIcons.args = {
	connotation: 'cta', layout: 'filled', text: 'badge', icon: 'check-line', iconTrailing: 'check-line'
};

export const Soft = Template.bind({});
Soft.args = { connotation: 'cta', layout: 'soft', text: 'badge' };

export const OutlinedDuotone = Template.bind({});
OutlinedDuotone.args = { layout: 'outlined-duotone', text: 'badge' };

export const PillShape = Template.bind({});
PillShape.args = { layout: 'filled', shape: 'pill', text: 'badge' };

export const Dense = Template.bind({});
Dense.args = { layout: 'filled', dense: '', text: 'badge' };

export const Enlarged = Template.bind({});
Enlarged.args = { layout: 'filled', enlarged: '', text: 'badge' };
