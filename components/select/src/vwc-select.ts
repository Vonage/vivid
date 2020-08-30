import { customElement, property } from 'lit-element';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-icon';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css';
import { style as mwcSelectStyle } from '@material/mwc-select/mwc-select-css.js';
import { VWCTextField } from '@vonage/vwc-textfield/vwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSelect.styles = [styleCoupling, mwcSelectStyle, vwcSelectStyle];

function getFormByIdOrClosest(element: VWCTextField | VWCSelect): HTMLFormElement | null {
	const formId = element.form;
	const formElement = formId ? document.getElementById(formId) : element.closest('form');
	return formElement instanceof HTMLFormElement ? formElement : null;
}

function addHiddenInput(hostingForm: HTMLElement, { name, value }: { name: string | undefined, value: string }) {
	const hiddenInput = document.createElement('input');
	hiddenInput.style.display = 'none';
	if (name !== undefined) {
		hiddenInput.setAttribute('name', name);
	}
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
		this.addSelectToForm();
	}

	private replaceIcon(): void {
		const ddIconClass = 'mdc-select__dropdown-icon';
		const chevronIcon = document.createElement('vwc-icon');
		chevronIcon.classList.add(ddIconClass);
		chevronIcon.setAttribute('type', 'down');
		this.shadowRoot?.querySelector(`.${ddIconClass}`)?.replaceWith(chevronIcon);
	}

	protected addSelectToForm(): void {
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
