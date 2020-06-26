import '@vonage/vwc-chips/vwc-chip.js';
import '@vonage/vwc-chips/vwc-chip-set.js';
import '@storybook/addon-console';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/ChipSet',
	component: 'vwc-chip-set',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Default</h3>
	<vwc-chip-set id="chipSetA">
		<vwc-chip label="Chip One"></vwc-chip>
		<vwc-chip label="Chip Two"></vwc-chip>
		<vwc-chip label="Chip Three"></vwc-chip>
		<vwc-chip label="Chip Four"></vwc-chip>
	</vwc-chip-set>

	<h3>Removable</h3>
	<vwc-chip-set id="chipSetB" @MDCChip:removal="${(e) => logRemoval(e)}">
		<vwc-chip label="Chip One" removable></vwc-chip>
		<vwc-chip label="Chip Two" removable></vwc-chip>
		<vwc-chip label="Chip Three" removable></vwc-chip>
	</vwc-chip-set>
`;

function logRemoval(e) {
	let payload = {
		type: 'MDCChip:removal',
		detail: {
			chipId: e.detail.chipId
		}
	}

	console.log('chipSetB.chips method', chipSetB.chips);
	console.log('MDCChip:removal event', payload);
}
