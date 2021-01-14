import '@vonage/vvd-core';
import '@vonage/vwc-notched-outline';
import { customElement, html, property, TemplateResult } from 'lit-element';
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
import { TextArea as MWCTextArea } from '@material/mwc-textarea';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextareaStyle } from './vwc-textarea.css';
import { style as mwcTextareaStyle } from '@material/mwc-textarea/mwc-textarea-css.js';
import { style as mwcTextfieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import { associateWithForm } from '@vonage/vvd-foundation/form-association';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textarea': VWCTextArea;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextArea.styles = [
	styleCoupling,
	mwcTextareaStyle,
	mwcTextfieldStyle,
	vwcTextareaStyle,
];

/**
 * This component is an extension of [<mwc-textarea>](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)
 */
@customElement('vwc-textarea')
export class VWCTextArea extends MWCTextArea {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	resizable = false;

	@property({ type: String, reflect: true })
	form: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		associateWithForm(this, this.formElement);
		handleAutofocus(this);
	}

	protected renderOutline(): TemplateResult | string {
		return !this.outlined
			? ''
			: html`<vwc-notched-outline class="mdc-notched-outline vvd-notch">
					${this.renderLabel()}
			  </vwc-notched-outline>`;
	}

	renderHelperText(
		shouldRenderHelperText: boolean,
		shouldRenderCharCounter: boolean
	): TemplateResult | string {
		if (!shouldRenderHelperText) {
			return '';
		}
		const showValidationMessage = this.validationMessage && !this.isUiValid;
		const classesMap = {
			'mdc-text-field-helper-text--persistent': this.helperPersistent,
			'mdc-text-field-helper-text--validation-msg': showValidationMessage,
		};
		const validationMessage = showValidationMessage
			? this.validationMessage
			: this.helper;
		const classes = mapToClasses(classesMap).join(' ');
		return html`
			<div class="mdc-text-field-helper-line ${classes}">
				<vwc-icon
					class="mdc-text-field-helper-icon"
					type="info-negative"
					size="small"
				></vwc-icon>
				<span class="spacer"></span>
				<div class="mdc-text-field-helper-text">${validationMessage}</div>
				${this.renderCharCounter(shouldRenderCharCounter)}
			</div>
		`;
	}
}
