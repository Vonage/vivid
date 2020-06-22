import '@vonage/vwc-chips/vwc-chip.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Chip',
	component: 'vwc-chip',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Small</h3>
	<vwc-chip label="Chip" theme="black" size="small"></vwc-chip>

	<h3>Default</h3>
	<vwc-chip label="Chip" theme="blue"></vwc-chip>

	<h3>Large</h3>
	<vwc-chip label="Chip" theme="green" size="large"></vwc-chip>

	<h3>Pill</h3>
	<vwc-chip label="Chip" theme="indigo" pill></vwc-chip>

	<h3>Transparent</h3>
	<vwc-chip label="Chip" theme="orange" transparent></vwc-chip>

	<h3>Outlined</h3>
	<vwc-chip label="Chip" theme="purple" outlined></vwc-chip>

	<h3>Removable</h3>
	<vwc-chip label="Chip" removable></vwc-chip>
`;