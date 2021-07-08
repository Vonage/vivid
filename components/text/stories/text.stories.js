import '@vonage/vwc-text/vwc-text.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';
import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';

export default {
	title: 'Alpha/Components/Text',
	component: 'vwc-text',
	argTypes
};

const Template = args => html`<vwc-text ...=${spread(args)}>
	lorem ipsum dolor sit amet, consectetur adipiscing elit
</vwc-text>`;

export const Basic = Template.bind({});
Basic.args = { 'font-face': VVDFontFace.Headline1 };
