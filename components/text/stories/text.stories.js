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
	The quick brown fox jumps over the lazy dog
</vwc-text>`;

export const Basic = Template.bind({});
Basic.args = { 'font-face': VVDFontFace.Headline2 };

export const Connotation = Template.bind({});
Connotation.args = { 'font-face': VVDFontFace.Headline2, connotation: 'cta' };

const TemplateWithNestedElements = args => html`<p>
		<vwc-text font-face="body-1">
			Press <kbd><vwc-text font-face="body-1-code">Ctrl</vwc-text></kbd> + <kbd><vwc-text font-face="body-1-code">C</vwc-text></kbd> to copy text (Windows).
		</vwc-text>
	</p>`;

export const WithNestedElements = TemplateWithNestedElements.bind({});

const TemplateMultipleElements = args => html`<div>
		<vwc-text font-face="headline-1">In the pursuit of happiness</vwc-text>
	<vwc-text font-face="headline-2">We are easily influenced by the hedonistic lifestyles</vwc-text>
	<vwc-text font-face="body-1"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat pulvinar risus eget mollis. Mauris quam diam, faucibus sit amet accumsan et, faucibus quis justo.</p></vwc-text>
	<vwc-text font-face="body-1"><p>of others and ultimately succumb to a personality not of our own. Press <kbd><vwc-text font-face="body-1-code">Ctrl</vwc-text></kbd> + <kbd><vwc-text font-face="body-1-code">C</vwc-text></kbd> to copy text (Windows). We are easily influenced by the hedonistic lifestyles of others and ultimately succumb to a personality not of our own.</p></vwc-text>
	<vwc-text font-face="title-1">The hedonistic lifestyles</vwc-text>
	<vwc-text font-face="body-1">Proin ut fringilla nunc, a tristique nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean finibus leo eu augue viverra, et aliquet mi dignissim. Morbi venenatis tristique hendrerit. Donec sagittis non risus ut vestibulum. Mauris non gravida urna, ut bibendum odio.</vwc-text>
	<vwc-text font-face="body-1"><p>of others and ultimately succumb to a personality not of our own. Press <kbd><vwc-text font-face="body-1-code">Ctrl</vwc-text></kbd> + <kbd><vwc-text font-face="body-1-code">C</vwc-text></kbd> to copy text (Windows). We are easily influenced by the hedonistic lifestyles of others and ultimately succumb to a personality not of our own.</p></vwc-text>
	<vwc-text font-face="title-1">The lifestyles hedonistic </vwc-text>
	<vwc-text font-face="body-1"><p>of others and ultimately succumb to a personality not of our own. We are easily influenced by the hedonistic lifestyles of others and ultimately succumb to a personality not of our own.</p></vwc-text>
</div>`;

export const WithMultipleElements = TemplateMultipleElements.bind({});
