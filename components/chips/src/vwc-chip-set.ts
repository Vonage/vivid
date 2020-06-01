import '@vonage/vvd-core';
import { css, customElement } from 'lit-element';
import { ChipSet as MWCChipSet } from '@material/mwc-chips/mwc-chip-set';
import { style } from './vwc-chip-set.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip-set': VWCChipSet;
	}
}

@customElement('vwc-chip-set')
export class VWCChipSet extends MWCChipSet {
	static get styles() {
		return css`
			${super.styles}
			${style}
		`;
	}
}
