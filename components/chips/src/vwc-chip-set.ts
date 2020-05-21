import '@vonage/vvd-core';
import { style } from '@material/mwc-chips/mwc-chip-set.css.js';
import { ChipSetBase } from '@material/mwc-chips/mwc-chip-set-base.js';
import { customElement } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip-set': VwcChipSet;
	}
}

@customElement('mwc-chip-set')
class MwcChipSet extends ChipSetBase {
	static styles = style;
}

@customElement('vwc-chip-set')
export class VwcChipSet extends MwcChipSet { }
