import { COMPONENT_NAME } from '@vonage/vwc-snackbar/vwc-snackbar.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Snackbar',
	component: COMPONENT_NAME,
	argTypes
};

const TemplatePlain = args => html`<${COMPONENT_NAME} ...=${spread(args)}></${COMPONENT_NAME}>`;

export const Basic = TemplatePlain.bind({});
Basic.args = {};
