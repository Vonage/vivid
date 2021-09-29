import { customElement } from 'lit-element';
import { ChipSet as MWCChipSet } from './mwc-chips/mwc-chip-set.js';
import { style as vwcChipSetStyle } from './vwc-chip-set.css.js';
import { style as mwcChipSetStyle } from './mwc-chips/mwc-chip-set.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip-set': VWCChipSet;
	}
}

/**
 * This component is an extension of [<mwc-chip-set>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCChipSet.styles = [styleCoupling, mwcChipSetStyle, vwcChipSetStyle];

@customElement('vwc-chip-set')
export class VWCChipSet extends MWCChipSet { }
