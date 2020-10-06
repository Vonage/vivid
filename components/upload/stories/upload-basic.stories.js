import '@vonage/vwc-upload/vwc-upload.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Composite/Upload',
	component: 'vwc-upload',
	argTypes
}

const Template = args => html`
	<vwc-upload ...=${spread(args)}>
		<input
			slot="fileInput"
			type="file"
      name="avatar"
      accept="image/png, image/jpeg"/>
	</vwc-upload>
`;

export const Basic = Template.bind({});
Basic.args = { label: 'Upload your image file' };