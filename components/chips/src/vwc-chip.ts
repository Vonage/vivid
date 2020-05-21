import '@vonage/vvd-core';
import { style } from '@material/mwc-chips/mwc-chip.css.js';
import { ChipBase } from '@material/mwc-chips/mwc-chip-base.js';
import { customElement } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VwcChip;
	}
}

@customElement('mwc-chip')
class MwcChip extends ChipBase {
	static styles = style;
}

@customElement('vwc-chip')
export class VwcChip extends MwcChip { }
