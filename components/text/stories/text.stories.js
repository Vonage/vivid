import '@vonage/vwc-text/vwc-text.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
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
