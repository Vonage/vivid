import '@vonage/vwc-textarea/vwc-textarea.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Textarea',
	component: 'vwc-textarea',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-textarea outlined label="Vwc textarea" @keydown=${handleKeyDown}></vwc-textarea>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}