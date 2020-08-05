import '@vonage/vwc-textfield/vwc-textfield.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Textfield',
	component: 'vwc-textfield'
}

export const basic = () => html`
	<vwc-textfield outlined label="VWC textfield" @keydown=${handleKeyDown}></vwc-textfield>
`;

function handleKeyDown(e) {
	e.stopPropagation();
}
