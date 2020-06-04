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
			this.outlined ? 'vwc-chip--outlined' : '',
			this.pill ? 'vwc-chip--pill' : '',
			this.size ? `vwc-chip--${this.size}` : '',
			this.theme ? `vwc-chip--${this.theme}` : '',
			this.transparent ? 'vwc-chip--transparent' : '',
		];
		
		var customClasses = Array.from(this.classList).filter(e => !e.includes('vwc-chip'));
		var filteredClasses = classes.filter(e => e !== '');

    /* eslint-disable wc/no-self-class */
		this.className = '';
    /* eslint-disable wc/no-self-class */
		this.classList.add(...customClasses, ...filteredClasses);
	}
}
