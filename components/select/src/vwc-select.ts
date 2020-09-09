import { customElement, property } from 'lit-element';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-icon';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css';
import { style as mwcSelectStyle } from '@material/mwc-select/mwc-select-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSelect.styles = [styleCoupling, mwcSelectStyle, vwcSelectStyle];

/**
 * This component is an extension of [<mwc-select>](https://github.com/material-components/material-components-web-components/tree/master/packages/select)
 */
@customElement('vwc-select')
export class VWCSelect extends MWCSelect {
	@property({ type: HTMLInputElement, reflect: false })
	hiddenInput: HTMLInputElement | undefined;

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true })
	name: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
		this.replaceIcon();
		addInputToForm(this);
	}

	private replaceIcon(): void {
		const ddIconClass = 'mdc-select__dropdown-icon';
		const chevronIcon = document.createElement('vwc-icon');
		chevronIcon.classList.add(ddIconClass);
		chevronIcon.setAttribute('type', 'down');
		this.shadowRoot?.querySelector(`.${ddIconClass}`)?.replaceWith(chevronIcon);
	}
}
