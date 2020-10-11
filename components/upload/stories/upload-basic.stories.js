import '@vonage/vwc-upload';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Cells/Upload',
	component: 'vwc-upload',
	argTypes
}

const TemplateA = args => html`
	<vwc-upload ...=${spread(args)}></vwc-upload>
`;

export const Basic = TemplateA.bind({});
Basic.args = {};

export const Label = TemplateA.bind({});
Label.args = { label: 'Upload your image', buttonText: 'Upload' };

export const Accept = TemplateA.bind({});
Accept.args = { label: 'Upload your PDF', accept: '.pdf' };

export const Multiple = TemplateA.bind({});
Multiple.args = { label: 'Upload your PDFs', multiple: true };