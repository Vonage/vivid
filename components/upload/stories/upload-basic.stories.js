import '@vonage/vwc-upload';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Cells/Upload',
	component: 'vwc-upload',
	argTypes
}

const Template = args => html`
	<vwc-upload ...=${spread(args)} @change="${onChange}"></vwc-upload>
`;

export const Basic = Template.bind({});
Basic.args = { name: 'some-file' };

export const Label = Template.bind({});
Label.args = { buttonText: 'Upload', label: 'Upload your image', name: 'some-file' };

export const Accept = Template.bind({});
Accept.args = { accept: '.pdf', label: 'Upload your PDF', name: 'some-file' };

export const Multiple = Template.bind({});
Multiple.args = { label: 'Upload your PDFs', multiple: true, name: 'some-file' };

function onChange(e) {
	console.log(e.target.value);
}