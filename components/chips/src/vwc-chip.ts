import '@vonage/vvd-core';
import { css, customElement } from 'lit-element';
import { Chip as MWCChip } from '@material/mwc-chips/mwc-chip';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

@customElement('vwc-chip')
export class VWCChip extends MWCChip {
	static get styles() {
		return css`
			${super.styles}
			${style}
		`;
	}
}
