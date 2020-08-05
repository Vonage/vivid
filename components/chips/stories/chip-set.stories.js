import '@vonage/vwc-chips/vwc-chip.js';
import '@vonage/vwc-chips/vwc-chip-set.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/ChipSet',
	component: 'vwc-chip-set'
}

export const basic = () => html`
	<h3>Default</h3>
	<vwc-chip-set id="chipSetA">
		<vwc-chip label="Chip One"></vwc-chip>
		<vwc-chip label="Chip Two"></vwc-chip>
		<vwc-chip label="Chip Three"></vwc-chip>
		<vwc-chip label="Chip Four"></vwc-chip>
	</vwc-chip-set>

	<h3>Filter</h3>
	<vwc-chip-set id="chipSetB" type="filter" @MDCChip:selection="${handleSelection}">
		<vwc-chip label="1"></vwc-chip>
		<vwc-chip label="2" icon="fingerprint"></vwc-chip>
		<vwc-chip label="3" icon="language"></vwc-chip>
	</vwc-chip-set>

	<h3>Removable</h3>
	<vwc-chip-set id="chipSetC" @MDCChip:removal="${handleRemoval}">
		<vwc-chip label="Chip One" removable></vwc-chip>
		<vwc-chip label="Chip Two" removable></vwc-chip>
		<vwc-chip label="Chip Three" removable></vwc-chip>
	</vwc-chip-set>
`;

function handleSelection(e) {
	let payload = {
		type: 'MDCChip:selection',
		detail: {
			chipId: e.detail.chipId,
			selected: e.detail.selected
		}
	}

	console.log('chipSetB.chips method', chipSetB.chips);
	console.log('MDCChip:selection event', payload);
}

function handleRemoval(e) {
	let payload = {
		type: 'MDCChip:removal',
		detail: {
			chipId: e.detail.chipId
		}
	}

	console.log('chipSetC.chips method', chipSetC.chips);
	console.log('MDCChip:removal event', payload);
}
