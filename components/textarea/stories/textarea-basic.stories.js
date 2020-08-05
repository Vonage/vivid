import '@vonage/vwc-textarea/vwc-textarea.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Textarea',
	component: 'vwc-textarea'
}

export const basic = () => html`
	<vwc-textarea outlined label="Vwc textarea" @keydown=${handleKeyDown}></vwc-textarea>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}
