import '@vonage/vwc-badge/vwc-badge.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Badge',
	component: 'vwc-badge'
}

export const basic = () => html`

	<h3>Outlined</h3>
	<vwc-badge>
		plain text
	</vwc-badge>

`;
