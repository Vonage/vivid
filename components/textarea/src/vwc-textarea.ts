import '@vonage/vvd-core';
import '@vonage/vwc-helper-message';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-elevation-overlay';
import { customElement, html, property, TemplateResult } from 'lit-element';
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

	protected renderRipple(): TemplateResult {
		return html`<vwc-elevation-overlay></vwc-elevation-overlay>`;
	}

	protected renderOutline(): TemplateResult | string {
		return !this.outlined
			? ''
			: html`<vwc-notched-outline class="mdc-notched-outline vvd-notch">
					${this.renderLabel()}
			  </vwc-notched-outline>`;
	}

	renderHelperText(shouldRenderHelperText: boolean): TemplateResult | string {
		if (!shouldRenderHelperText) {
			return '';
		}

		const isError = this.validationMessage && !this.isUiValid;
		const text = isError ? this.validationMessage : this.helper;

		return html`<vwc-helper-message
			id="helper-text"
			class="helper-message"
			?disabled="${this.disabled}"
			?is-error="${isError}"
			>${text}</vwc-helper-message
		>`;
	}
}
