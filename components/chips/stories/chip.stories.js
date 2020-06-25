import '@vonage/vwc-chips/vwc-chip.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Chip',
	component: 'vwc-chip',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Default</h3>
	<vwc-chip label="Chip"></vwc-chip>

	<h3>Removable</h3>
	<vwc-chip label="Chip" removable></vwc-chip>
`;
