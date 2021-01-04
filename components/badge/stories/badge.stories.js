import '@vonage/vwc-badge/vwc-badge.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Badge',
	component: 'vwc-badge',
	argTypes
}

const Template = args => html`<vwc-badge ...=${spread(args)}>I'm a badge</vwc-badge>`;

export const Basic = Template.bind({});
Basic.args = { connotation: 'cta', layout: 'filled' };

export const Soft = Template.bind({});
Soft.args = { connotation: 'cta', layout: 'soft' };

export const Outlined = Template.bind({});
Outlined.args = { layout: 'outlined' };

export const PillShape = Template.bind({});
PillShape.args = { layout: 'filled', shape: 'pill' };

export const Dense = Template.bind({});
Dense.args = { layout: 'filled', dense: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { layout: 'filled', enlarged: '' };
