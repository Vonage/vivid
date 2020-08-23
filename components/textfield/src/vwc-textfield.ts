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

function getFormByIdOrClosest(element: HTMLElement, formId = '') {
	return formId ? document.getElementById(formId) : element.closest('form');
}

function addHiddenInput(hostingForm: HTMLElement, fieldName: string) {
	const hiddenInput = document.createElement('input');
	hiddenInput.style.opacity = '0';
	hiddenInput.style.position = 'fixed';
	hiddenInput.setAttribute('name', fieldName);

	hostingForm.appendChild(hiddenInput);

	return hiddenInput;
}

function setValueAndValidity(inputField: HTMLInputElement | undefined, value: string, validationMessage = '') {
	if (!inputField) {
		return;
	}
	inputField.value = value;
	inputField.setCustomValidity(validationMessage);
}

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({ type: HTMLInputElement, reflect: false })
	hiddenInput: HTMLInputElement | undefined;

	@property({ type: String, reflect: true })
	form: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
		this.addInputToForm();
	}

	protected addInputToForm() {
		const hostingForm = getFormByIdOrClosest(this, this.form);

		if (!hostingForm) {
			return;
		}

		this.hiddenInput = addHiddenInput(hostingForm, this.name);
		setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);

		hostingForm.addEventListener('reset', () => {
			this.value = this.formElement.value = '';
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});

		this.addEventListener('change', () => {
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});

		this.addEventListener('input', () => {
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});
	}
}
