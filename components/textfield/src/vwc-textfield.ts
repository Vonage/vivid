import { customElement, property, html, TemplateResult } from 'lit-element';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-icon';
import { spreadObjectToClasses } from '@vonage/vvd-foundation/class-utils.js';
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

function getFormByIdOrClosest(element: VWCTextField): HTMLFormElement | null {
	const formId = element.form;
	const formElement = formId ? document.getElementById(formId) : element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function addHiddenInput(hostingForm: HTMLElement, { name, value }: { name: string, value: string }) {
	const hiddenInput = document.createElement('input');
	hiddenInput.style.display = 'none';
	hiddenInput.setAttribute('name', name);
	hiddenInput.defaultValue = value;
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

	renderHelperText(charCounterTemplate = {}): TemplateResult {
		if (!this.shouldRenderHelperText) {
			return html``;
		}
		const showValidationMessage = this.validationMessage && !this.isUiValid;
		const classes = {
			'mdc-text-field-helper-text--persistent': this.helperPersistent,
			'mdc-text-field-helper-text--validation-msg': showValidationMessage,
		};
		return html`
			<div class="mdc-text-field-helper-line">
				<vwc-icon type="info-negative" size="small"></vwc-icon>
				<div class="mdc-text-field-helper-text ${spreadObjectToClasses(classes).join(' ')}">${showValidationMessage ? this.validationMessage : this.helper}</div>
					${charCounterTemplate}
			</div>
		`;
	}

	protected addInputToForm(): void {
		const hostingForm = getFormByIdOrClosest(this);

		if (!hostingForm) {
			return;
		}

		this.hiddenInput = addHiddenInput(hostingForm, this);
		setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);

		hostingForm.addEventListener('reset', () => {
			this.value = this.formElement.value = this.hiddenInput?.defaultValue ?? '';
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});

		this.hiddenInput.addEventListener('invalid', (event) => {
			event.stopPropagation();
			event.preventDefault();
		});

		this.addEventListener('change', () => {
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});

		this.addEventListener('input', () => {
			setValueAndValidity(this.hiddenInput, this.value, this.formElement.validationMessage);
		});
	}
}
