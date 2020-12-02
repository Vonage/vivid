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
		<vwc-badge connotation="cta" layout="filled">I'm a badge</vwc-badge>
		<vwc-badge connotation="cta" layout="outlined">I'm a badge</vwc-badge>
	</vwc-badge-combined>
`;

export const Basic = Template.bind({});

export const PillShape = Template.bind({});
PillShape.args = { shape: 'pill' };
