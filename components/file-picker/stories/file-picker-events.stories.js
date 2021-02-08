import '@vonage/vwc-file-picker';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Composite/File Picker/Events',
	component: 'vwc-file-picker',
	argTypes
};

const Template = args => html`
	<vwc-file-picker ...=${spread(args.self)} @change="${onChange}">
		<input type="file" name="file-input" ...=${spread(args.input)}/>
		<vwc-button slot="button" type="button" layout="filled" icon="upload" trailingIcon>Add Files</vwc-button>
	</vwc-file-picker>
`;

function onChange(e) {
	const list = [];
	for (let i = 0; i < e.target.files.length; i++) {
		list.push(e.target.files[i].name);
	}
	console.log(list.join(', '));
}

export const SingleUnrestrictedChangeEvent = Template.bind({});
SingleUnrestrictedChangeEvent.args = {
	self: { label: 'Pick your favorive', helper: 'single file of any type' }
};

export const MultipleRestrictedChangeEvent = Template.bind({});
MultipleRestrictedChangeEvent.args = {
	self: { label: 'Pick your favorive', helper: 'multiple files of PDF type only' },
	input: { name: 'sfile-input', multiple: true, accept: '.pdf' }
};

const TemplateWithForm = args => html`
	<form @submit="${onSubmit}">
		<div>This is an example of file-picker living in form</div>
		<hr>
		<div>
			<vwc-file-picker ...=${spread(args.self)}>
				<input type="file" name="file-input" ...=${spread(args.input)}/>
				<vwc-button slot="button" type="button" layout="filled" icon="upload" trailingIcon>Add Files</vwc-button>
			</vwc-file-picker>
		</div>
		<hr>
		<vwc-button layout="filled">Submit</vwc-button>
	</form>
`;

function onSubmit(e) {
	e.preventDefault();
	const fs = new FormData(e.target).getAll('file-input');
	console.log(fs.map(f => f.name).join(', '));
}

export const SingleRestrictedSubmitEvent = TemplateWithForm.bind({});
SingleRestrictedSubmitEvent.args = {
	self: { label: 'Pick your favorive', helper: 'single file of PDF type only' },
	input: { accept: '.pdf' }
};

export const MultipleUnestrictedSubmitEvent = TemplateWithForm.bind({});
MultipleUnestrictedSubmitEvent.args = {
	self: { label: 'Pick your favorive', helper: 'multiple files of any type' },
	input: { accept: '.pdf', multiple: true }
};
