import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { ChipSet as MWCChipSet } from '@material/mwc-chips/mwc-chip-set';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip-set': VWCChipSet;
	}
}

@customElement('vwc-chip-set')
export class VWCChipSet extends MWCChipSet { }
