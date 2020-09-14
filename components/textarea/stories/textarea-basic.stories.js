import '@vonage/vwc-textarea/vwc-textarea.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Textarea',
	component: 'vwc-textarea',
	argTypes
}

const Template = (args) =>
	html`<vwc-textarea ...=${spread(args)} @keydown=${handleKeyDown}></vwc-textarea>`;

export const Default = Template.bind({});
Default.args = { outlined: '', label: 'Vwc textarea' };

export const Disabled = Template.bind({});
Disabled.args = { outlined: '', disabled: '', label: 'Vwc textarea', value: 'Something' };

export const Required = Template.bind({});
Required.args = {
	outlined: '', required: '', label: 'Vwc textarea', value: 'Clean to see validation effect',
	helper: 'Are we closer than before?',
	validationMessage: 'Required field'
};

function handleKeyDown(e) {
	e.stopPropagation();
}
