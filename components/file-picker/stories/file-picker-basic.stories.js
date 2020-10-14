import '@vonage/vwc-file-picker';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Cells/File Picker',
	component: 'vwc-file-picker',
	argTypes
}

const Template = args => html`
	<vwc-file-picker ...=${spread(args)} @change="${onChange}"></vwc-file-picker>
`;

function onChange(e) {
	console.log(e.target.value);
}

export const Basic = Template.bind({});
Basic.args = { name: 'some-file' };

export const Label = Template.bind({});
Label.args = { buttonText: 'Select files', label: 'Pick up your image', name: 'some-file' };

export const Accept = Template.bind({});
Accept.args = { accept: '.pdf', label: 'Select your PDF', name: 'some-file' };

export const Multiple = Template.bind({});
Multiple.args = { label: 'Choose your PDFs', multiple: true, name: 'some-file' };

const TemplateWithForm = args => html`
	<form @submit="${onSubmit}">
		<div>This is an example of file-picker living in form</div>
		<vwc-file-picker ...=${spread(args)}></vwc-file-picker>
		<button>Submit</button>
	</form>
`;

function onSubmit(e) {
	e.preventDefault();
	const fs = new FormData(e.target).getAll('some-file');
	console.log(fs.map(f => f.name).join(', '));
}

export const WithinForm = TemplateWithForm.bind({});
WithinForm.args = { label: 'Choose your PDFs', helper: 'only PDF files allowed', accept: '.pdf', multiple: true, name: 'some-file' };
