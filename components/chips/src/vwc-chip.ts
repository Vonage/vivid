import { css, customElement, property, CSSResult } from 'lit-element';
import { Chip as MWCChip } from '@material/mwc-chips/mwc-chip';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

/**
 * This component is an extension of [<mwc-chip>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)
 */
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

		const customClasses = Array.from(this.classList).filter(
			(e) => !e.includes('vwc-chip')
		);
		const filteredClasses = classes.filter((e) => e !== '');

		/* eslint-disable wc/no-self-class */
		this.className = '';
		/* eslint-disable wc/no-self-class */
		this.classList.add(...customClasses, ...filteredClasses);
	}
}
