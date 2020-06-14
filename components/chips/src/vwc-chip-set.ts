import { css, customElement, CSSResult } from 'lit-element';
import { ChipSet as MWCChipSet } from '@material/mwc-chips/mwc-chip-set';
import { style } from './vwc-chip-set.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip-set': VWCChipSet;
	}
}

/**
 * This component is an extension of [<mwc-chip-set>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)
 */
@customElement('vwc-chip-set')
export class VWCChipSet extends MWCChipSet {
	static get styles(): CSSResult {
		return css`
			${super.styles}
			${style}
		`;
	}
}
