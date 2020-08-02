import '@vonage/vwc-textfield/vwc-textfield.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Textfield',
	component: 'vwc-textfield',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Regular</h3>
	<vwc-textfield outlined label="VWC textfield" @keydown="${handleKeyDown}" @change="${onChange}" @input="${onInput}"></vwc-textfield>

	<h3>Disabled</h3>
	<vwc-textfield outlined disabled label="Hint text" value="Text" @keydown="${handleKeyDown}"></vwc-textfield>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}

function onChange(e) {
	console.log('change');
}

function onInput(e) {
	console.log('input');
}