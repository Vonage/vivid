import '@vonage/vwc-upload/vwc-upload.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Upload',
	component: 'vwc-upload',
	argTypes
}

const Template = args => html`<vwc-upload ...=${spread(args)}>Upload</vwc-upload>`;

export const Basic = Template.bind({});
Basic.args = { };
