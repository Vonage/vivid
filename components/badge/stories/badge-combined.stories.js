import '@vonage/vwc-badge/vwc-badge-combined.js';
import '@vonage/vwc-badge/vwc-badge.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-badge-combined.js';

export default {
	title: 'Atoms/Badge Combined',
	component: 'vwc-badge-combined',
	subcomponents: 'vwc-badge',
	argTypes
}

const Template = args => html`
	<vwc-badge-combined ...=${spread(args)}>
		<vwc-badge layout="filled">I'm a badge</vwc-badge>
		<vwc-badge layout="outlined">I'm a badge</vwc-badge>
	</vwc-badge-combined>
`;

export const Basic = Template.bind({});
Basic.args = { connotation: 'cta' };

export const PillShape = Template.bind({});
PillShape.args = { shape: 'pill' };

export const Dense = Template.bind({});
Dense.args = { dense: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { enlarged: '' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: '' };
