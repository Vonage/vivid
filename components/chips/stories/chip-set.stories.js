import '@vonage/vwc-chips/vwc-chip.js';
import '@vonage/vwc-chips/vwc-chip-set.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/ChipSet',
	component: 'vwc-chip-set',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Small</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="blue" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="green" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="indigo" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="orange" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="purple" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="red" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="white" size="small"></vwc-chip>
		<vwc-chip label="Chip" theme="yellow" size="small"></vwc-chip>
	</vwc-chip-set>

	<h3>Default</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black"></vwc-chip>
		<vwc-chip label="Chip" theme="blue"></vwc-chip>
		<vwc-chip label="Chip" theme="green"></vwc-chip>
		<vwc-chip label="Chip" theme="indigo"></vwc-chip>
		<vwc-chip label="Chip" theme="orange"></vwc-chip>
		<vwc-chip label="Chip" theme="purple"></vwc-chip>
		<vwc-chip label="Chip" theme="red"></vwc-chip>
		<vwc-chip label="Chip" theme="white"></vwc-chip>
		<vwc-chip label="Chip" theme="yellow"></vwc-chip>
	</vwc-chip-set>

	<h3>Large</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="blue" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="green" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="indigo" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="orange" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="purple" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="red" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="white" size="large"></vwc-chip>
		<vwc-chip label="Chip" theme="yellow" size="large"></vwc-chip>
	</vwc-chip-set>

	<h3>Pill</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black" pill></vwc-chip>
		<vwc-chip label="Chip" theme="blue" pill></vwc-chip>
		<vwc-chip label="Chip" theme="green" pill></vwc-chip>
		<vwc-chip label="Chip" theme="indigo" pill></vwc-chip>
		<vwc-chip label="Chip" theme="orange" pill></vwc-chip>
		<vwc-chip label="Chip" theme="purple" pill></vwc-chip>
		<vwc-chip label="Chip" theme="red" pill></vwc-chip>
		<vwc-chip label="Chip" theme="white" pill></vwc-chip>
		<vwc-chip label="Chip" theme="yellow" pill></vwc-chip>
	</vwc-chip-set>

	<h3>Transparent</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="blue" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="green" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="indigo" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="orange" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="purple" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="red" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="white" transparent></vwc-chip>
		<vwc-chip label="Chip" theme="yellow" transparent></vwc-chip>
	</vwc-chip-set>

	<h3>Outlined</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" theme="black" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="blue" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="green" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="indigo" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="orange" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="purple" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="red" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="white" outlined></vwc-chip>
		<vwc-chip label="Chip" theme="yellow" outlined></vwc-chip>
	</vwc-chip-set>

	<h3>Removable</h3>
	<vwc-chip-set>
		<vwc-chip label="Chip" removable></vwc-chip>
		<vwc-chip label="Chip" removable transparent></vwc-chip>
		<vwc-chip label="Chip" removable outlined></vwc-chip>
		<vwc-chip label="Chip" removable pill></vwc-chip>
	</vwc-chip-set>
`;