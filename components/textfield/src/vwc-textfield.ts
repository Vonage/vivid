import { customElement, property } from 'lit-element';
import '@vonage/vwc-notched-outline';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';

export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textfield': VWCTextField;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({type: HTMLInputElement, reflect: true})
	hiddenInput: HTMLInputElement | undefined;

	protected addInputToForm() {
		const hostingForm = this.closest('form');

		if (!hostingForm) {return;}

		const hiddenInput = this.hiddenInput = document.createElement('input');
		this.hiddenInput.style.opacity = '0';
		this.hiddenInput.style.position = 'fixed';
		this.hiddenInput.setAttribute('name', this.name);

		hostingForm.appendChild(this.hiddenInput);

		hiddenInput.value = this.value;
		this.addEventListener(
			'change',
			() => (hiddenInput.value = this.value)
		);
	}

	connectedCallback() {
		super.connectedCallback();
		this.addInputToForm();
	}

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
	}
}
