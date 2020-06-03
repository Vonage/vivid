import '@vonage/vvd-core';
import { css, customElement, property, CSSResult } from 'lit-element';
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
	@property({ type: String }) size = '';
	@property({ type: Boolean }) outlined = false;
	@property({ type: Boolean }) pill = false;
	@property({ type: String }) theme = '';
	@property({ type: Boolean }) transparent = false;

	static get styles(): CSSResult {
		return css`
			${super.styles}
			${style}
		`;
	}

	updated(): void {
		const classes = [
			this.outlined ? 'outlined' : '',
			this.pill ? 'pill' : '',
			this.size ? `${this.size}` : '',
			this.theme ? `${this.theme}` : '',
			this.transparent ? 'transparent' : ''
		];

		const filteredClasses = classes.filter(e => e !== '');

		/* eslint-disable wc/no-self-class */
		this.classList.remove(...this.classList);
		/* eslint-disable wc/no-self-class */
		this.classList.add(...filteredClasses);
	}
}
