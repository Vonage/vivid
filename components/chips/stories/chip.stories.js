import '@vonage/vwc-chips/vwc-chip.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Chip',
	component: 'vwc-chip'
}

export const basic = () => html`
	<h3>Default</h3>
	<vwc-chip label="Chip"></vwc-chip>

	<h3>Leading icon</h3>
	<vwc-chip label="Chip" icon="fingerprint"></vwc-chip>

	<h3>Removable</h3>
	<vwc-chip label="Chip" removable></vwc-chip>
`;
