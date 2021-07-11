import '@vonage/vwc-file-picker';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/File Picker/Presentation',
	component: 'vwc-file-picker',
	argTypes
};

const TemplateA = args => html`
	<vwc-file-picker ...=${spread(args.self)}><input type="file" name="fi-name" ...=${spread(args.input)}/></vwc-file-picker>
`;

export const Basic = TemplateA.bind({});
Basic.args = {
	input: { name: 'some-file' }
};

export const CustomSize = TemplateA.bind({});
CustomSize.args = {
	self: { style: '--vvd-file-picker-min-height: 60px; --vvd-file-picker-min-width: 200px;' }
};

export const WithLabel = TemplateA.bind({});
WithLabel.args = {
	self: { label: 'Pick up your image' }
};

export const WithLabelAndHelper = TemplateA.bind({});
WithLabelAndHelper.args = {
	self: { label: 'Pick up your image', helper: 'some useful text here' }
};

export const WithLeadingIcon = args => html`
	<vwc-file-picker ...=${spread(args)}>
		<input type="file" name="fi-name"/>
		<span slot="dd-hint">
			<vwc-icon type="upload"></vwc-icon>
			&nbsp;
			Drag & Drop files here
		</span>
	</vwc-file-picker>
`;

WithLeadingIcon.args = {	label: 'Pick up your image' };

const TemplateB = args => html`
	<vwc-file-picker ...=${spread(args.self)}>
		<input type="file" name="fi-name" ...=${spread(args.input)}/>
		<span slot="dd-hint">${args.ddContent}</span>
	</vwc-file-picker>
`;

export const CustomDragDropMessage = TemplateB.bind({});
CustomDragDropMessage.args = {
	self: { label: 'Pick up your image' },
	ddContent: 'Drop & Forget'
};

export const CustomDragDropNoMessage = TemplateB.bind({});
CustomDragDropNoMessage.args = {
	self: { label: 'Pick up your image', helper: 'drag and drop your files onto the surface' },
	ddContent: null
};

const TemplateC = args => html`
	<vwc-file-picker ...=${spread(args.self)}>
		<input type="file" name="fi-name" ...=${spread(args.input)}/>
		<span slot="dd-hint"></span>
		<vwc-button slot="button" type="button" layout="filled" icon="upload" trailingIcon>Select files</vwc-button>
	</vwc-file-picker>
`;

export const ButtonOnly = TemplateC.bind({});
ButtonOnly.args = {
	self: { 'drop-zone': false },
	input: { name: 'some-file' }
};

export const CustomButtonNoMessage = TemplateC.bind({});
CustomButtonNoMessage.args = {
	self: { label: 'Select your PDF' }
};

const TemplateD = args => html`
	<vwc-file-picker ...=${spread(args.self)}>
		<input type="file" name="fi-name" ...=${spread(args.input)}/>
		<span slot="dd-hint"></span>
		<span style="text-decoration: underline; cursor: pointer" slot="button">Click here to select files</span>
	</vwc-file-picker>
`;

export const CustomLinkClickNoMessage = TemplateD.bind({});
CustomLinkClickNoMessage.args = {
	self: { label: 'Select your file' }
};

const TemplateE = args => html`
	<vwc-file-picker ...=${spread(args.self)}>
		<input type="file" name="fi-name" ...=${spread(args.input)}/>
		<span slot="dd-hint">${args.ddContent}</span>
		<vwc-button slot="button" type="button" layout="filled" icon="upload" trailingIcon>Select Files</vwc-button>
	</vwc-file-picker>
`;

export const CustomMessageCustomButton = TemplateE.bind({});
CustomMessageCustomButton.args = {
	self: { label: 'Select your files', helper: 'drag and drop or select b file selector' },
	ddContent: 'Drag them all or'
};
