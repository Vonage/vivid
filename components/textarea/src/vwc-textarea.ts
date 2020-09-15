import { customElement, html, property, TemplateResult } from 'lit-element';
import '@vonage/vwc-notched-outline';
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
import { TextArea as MWCTextArea } from '@material/mwc-textarea';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextareaStyle } from './vwc-textarea.css';
import { style as mwcTextareaStyle } from '@material/mwc-textarea/mwc-textarea-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textarea': VWCTextArea;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextArea.styles = [styleCoupling, mwcTextareaStyle, vwcTextareaStyle];

/**
 * This component is an extension of [<mwc-textarea>](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)
 */
@customElement('vwc-textarea')
export class VWCTextArea extends MWCTextArea {
	@property({ type: String, reflect: true })
	form: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		addInputToForm(this, 'textarea');
	}

	protected renderOutline(): TemplateResult | Record<string, unknown> {
		if (!this.outlined) {
			return {};
		}

		return html` <vwc-notched-outline class="mdc-notched-outline vvd-notch">
			${this.renderLabel()}
		</vwc-notched-outline>`;
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
				<vwc-icon
					class="mdc-text-field-helper-icon"
					type="info-negative"
					size="small"
				></vwc-icon>
				<span class="spacer"></span>
				<div
					class="mdc-text-field-helper-text ${mapToClasses(classesMap).join(' ')}"
				>
					${showValidationMessage ? this.validationMessage : this.helper}
				</div>
				${charCounterTemplate}
			</div>
		`;
	}
}
