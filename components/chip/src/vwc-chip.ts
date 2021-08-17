import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { VWCChipBase } from './vwc-chip-base';
import { customElement } from 'lit-element';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

@customElement('vwc-chip')
export class VWCChip extends VWCChipBase {
	static styles = style;
}
