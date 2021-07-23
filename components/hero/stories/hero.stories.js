import '@vonage/vwc-hero/vwc-hero.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/⭐️ Hero',
	component: 'vwc-hero',
	argTypes
};

const Template = args => html`<vwc-hero ...=${spread(args)}></vwc-hero>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'chat-line', heading: 'Empty State Title', subheading: 'Empty state body for more information' };
