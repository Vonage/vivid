import '@vonage/vwc-textfield/vwc-textfield.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Textfield',
	component: 'vwc-textfield',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-textfield outlined label="VWC textfield" @keydown=${handleKeyDown}></vwc-textfield>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}