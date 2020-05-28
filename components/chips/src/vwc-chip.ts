import '@vonage/vvd-core';
import { css, customElement, property } from 'lit-element';
import { Chip as MWCChip } from '@material/mwc-chips/mwc-chip';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

@customElement('vwc-chip')
export class VWCChip extends MWCChip {
	// TODO: discuss prop names
	@property({type: String}) size = '';
	@property({type: Boolean}) pill = false;
	@property({type: String}) theme = '';
	@property({type: Boolean}) transparent = false;

	static get styles() {
		return css`
			${super.styles}
			${style}
		`;
	}
}
