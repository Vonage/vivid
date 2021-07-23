import '@vonage/vwc-figure/vwc-figure.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/⭐️ Figure',
	component: 'vwc-figure',
	argTypes
};

const Template = args => html`<vwc-figure ...=${spread(args)}></vwc-figure>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'chat-line' };
