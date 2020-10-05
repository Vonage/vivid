import '@vonage/vwc-chips/vwc-chip.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Chip',
	component: 'vwc-chip',
	argTypes,
	args: { label: 'Chip' }
}

const Template = args => html`<vwc-chip ...=${spread(args)}></vwc-chip>`;

export const Default = Template.bind({});

export const Icon = Template.bind({});
Icon.args = { icon: 'alert-negative' };

export const Removable = Template.bind({});
Removable.args = { removable: '' };
