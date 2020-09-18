import { customElement, property, html, TemplateResult } from 'lit-element';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-icon';
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';
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

	@property({ type: String, reflect: true })
	form: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot?.querySelector('.mdc-notched-outline')?.shadowRoot?.querySelector('.mdc-notched-outline')?.classList.add('vvd-notch');
		addInputToForm<VWCTextField>(this, this.formElement);
	}

	renderHelperText(charCounterTemplate = {}): TemplateResult {
		if (!this.shouldRenderHelperText) {
			return html``;
		}
		const showValidationMessage = this.validationMessage && !this.isUiValid;
		const classesMap = {
			'mdc-text-field-helper-text--persistent': this.helperPersistent,
			'mdc-text-field-helper-text--validation-msg': showValidationMessage,
		};
		return html`
			<div class="mdc-text-field-helper-line">
				<vwc-icon class="mdc-text-field-helper-icon" type="info-negative" size="small"></vwc-icon>
				<span class="spacer"></span>
				<div class="mdc-text-field-helper-text ${mapToClasses(classesMap).join(' ')}">${showValidationMessage ? this.validationMessage : this.helper}</div>
				${charCounterTemplate}
			</div>
		`;
	}
}