import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Chip as MWCChip } from '@material/mwc-chips/mwc-chip';
import { style as vwcChipStyle } from './vwc-chip.css';
import { style as mwcChipStyle } from '@material/mwc-chips/mwc-chip.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCChip.styles = [styleCoupling, mwcChipStyle, vwcChipStyle];

@customElement('vwc-chip')
export class VWCChip extends MWCChip {
	// TODO: discuss prop names
	// @property({ type: String }) size = '';
	// @property({ type: Boolean }) outlined = false;
	// @property({ type: Boolean }) pill = false;
	// @property({ type: String }) theme = '';
	// @property({ type: Boolean }) transparent = false;

	// updated(): void {
	// 	const classes = [
	// 		this.outlined ? 'vwc-chip--outlined' : '',
	// 		this.pill ? 'vwc-chip--pill' : '',
	// 		this.size ? `vwc-chip--${this.size}` : '',
	// 		this.theme ? `vwc-chip--${this.theme}` : '',
	// 		this.transparent ? 'vwc-chip--transparent' : '',
	// 	];

	// 	const customClasses = Array.from(this.classList).filter(
	// 		(e) => !e.includes('vwc-chip')
	// 	);
	// 	const filteredClasses = classes.filter((e) => e !== '');

	// 	/* eslint-disable wc/no-self-class */
	// 	this.className = '';
	// 	/* eslint-disable wc/no-self-class */
	// 	this.classList.add(...customClasses, ...filteredClasses);
	// }
}
