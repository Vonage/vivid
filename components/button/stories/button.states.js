import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Button',
	component: 'vwc-button',
	argTypes
};

const Template = args => html`<vwc-button ...=${spread(args)}>Hi</vwc-button>`;

export const Pending = Template.bind({});
Pending.args = { label: 'Pending', layout: 'filled' };
