import '@vonage/vwc-textarea/vwc-textarea.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Textarea',
	component: 'vwc-textarea'
}

export const basic = () => html`
	<style>
		vwc-textarea {
			width: 240px;
		}
	</style>

	<h3>Regular</h3>
	<vwc-textarea outlined label="Vwc textarea" @keydown=${handleKeyDown}></vwc-textarea>

	<h3>Disabled</h3>
	<vwc-textarea outlined disabled label="Vwc textarea" value="Something" @keydown=${handleKeyDown}></vwc-textarea>

	<h3>Required</h3>
	<vwc-textarea outlined required label="Vwc textarea" value="Clean to see validation effect" @keydown=${handleKeyDown}></vwc-textarea>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}
