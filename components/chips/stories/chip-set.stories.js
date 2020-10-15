import '@vonage/vwc-chips/vwc-chip.js';
import '@vonage/vwc-chips/vwc-chip-set.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Atoms/ChipSet',
	component: 'vwc-chip-set',
	argTypes: {
		chips: { table: { disable: true } },
		chipArgs: { table: { disable: true } }
	}
}

const Template = ({ chipArgs, ...args }) => html`
	<vwc-chip-set id="chipSet" @MDCChip:selection="${handleSelection}" @MDCChip:removal="${handleRemoval}" ...=${spread(args)}>
		<vwc-chip label="Chip One" ...=${spread(chipArgs)}></vwc-chip>
		<vwc-chip label="Chip Two" ...=${spread(chipArgs)}></vwc-chip>
		<vwc-chip label="Chip Three" ...=${spread(chipArgs)}></vwc-chip>
		<vwc-chip label="Chip Four" ...=${spread(chipArgs)}></vwc-chip>
	</vwc-chip-set>`;

export const Filter = Template.bind({});
Filter.args = { type: 'filter' };

export const Removable = Template.bind({});
Removable.args = { chipArgs: { removable: ''} };

function handleSelection(e) {
	let payload = {
		type: 'MDCChip:selection',
		detail: {
			chipId: e.detail.chipId,
			selected: e.detail.selected
		}
	}

	const chipSet = this.closest('#chipSet');
	console.log('chipSet.chips method', chipSet.chips);
	console.log('MDCChip:selection event', payload);
}

function handleRemoval(e) {
	let payload = {
		type: 'MDCChip:removal',
		detail: {
			chipId: e.detail.chipId
		}
	}

	const chipSet = this.closest('#chipSet');
	console.log('chipSet.chips method', chipSet.chips);
	console.log('MDCChip:removal event', payload);
}
