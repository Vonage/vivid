import '@vonage/vwc-file-picker';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Cells/FilePicker',
	component: 'vwc-file-picker',
	argTypes
}

const Template = args => html`
	<vwc-file-picker ...=${spread(args)} @change="${onChange}"></vwc-file-picker>
`;

export const Basic = Template.bind({});
Basic.args = { name: 'some-file' };

export const Label = Template.bind({});
Label.args = { buttonText: 'Select files', label: 'Pick up your image', name: 'some-file' };

export const Accept = Template.bind({});
Accept.args = { accept: '.pdf', label: 'Select your PDF', name: 'some-file' };

export const Multiple = Template.bind({});
Multiple.args = { label: 'Choose your PDFs', multiple: true, name: 'some-file' };

function onChange(e) {
	console.log(e.target.value);
}