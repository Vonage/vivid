import '@vonage/vwc-upload';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Composite/Upload',
	component: 'vwc-upload',
	argTypes
}

const Template = args => html`
<vwc-upload ...=${spread(args)}></vwc-upload>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Choose a profile picture:', multiple: true, accept: "image/png, image/jpeg" };
