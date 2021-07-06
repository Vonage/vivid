import '@vonage/vwc-text';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Text',
	component: 'vwc-text',
	argTypes
};

const Template = args => html`<vwc-text ...=${spread(args)}>
	Lorem	ipsum dolor sit amet, consectetur adipiscing el
</vwc-text>`;

export const Basic = Template.bind({});
Basic.args = { fontFace: 'headline' };
