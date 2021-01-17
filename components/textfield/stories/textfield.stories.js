import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Textfield',
	component: 'vwc-textfield',
	argTypes
};

const Template = (args) =>
	html`<vwc-textfield ...=${spread(args)} @keydown=${handleKeyDown} @change=${onChange} @input=${onInput}></vwc-textfield>`;

export const Default = Template.bind({});
Default.args = { outlined: '', label: 'e.g. username' };

export const Dense = Template.bind({});
Dense.args = { outlined: '', dense: '', label: 'VWC Textfield' };

export const PillShape = Template.bind({});
PillShape.args = { outlined: '', shape: 'pill', dense: '' };

export const Disabled = Template.bind({});
Disabled.args = { outlined: '', disabled: '', label: 'Hint test', value: 'Text' };

export const Validation = Template.bind({});
Validation.args = { outlined: '', label: 'Numbers only', required: '', pattern: '[0-9]+', validationMessage: 'Numbers only', helper: 'State your numbers, please!', value: 'Text' };

export const Icon = Template.bind({});
Icon.args = {
	outlined: '', icon: 'search', iconTrailing: 'cross-bold', dense: '', shape: 'pill', placeholder: 'Search',
	helper: 'Please enter your legal ID',
	validationMessage: 'Numbers only'
};

export const Autofocus = Template.bind({});
Autofocus.args = { outlined: '', label: 'e.g. username', autofocus: true };

function handleKeyDown(e) {
	e.stopPropagation();
}

function onChange() {
	console.log('change');
}

function onInput() {
	console.log('input');
}
