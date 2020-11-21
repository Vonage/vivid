import { listHandler } from './vwc-textfield-list-handler';
import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-notched-outline';
import {
	customElement,
	property,
	html,
	TemplateResult,
	PropertyValues,
} from 'lit-element';
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import {
	associateWithForm,
	submitOnEnter,
} from '@vonage/vvd-foundation/form-association';
import { Shape } from '@vonage/vvd-foundation/constants';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';
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
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape?: Shape;

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true })
	list: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.autoValidate = true;
		this.shadowRoot
			?.querySelector('.mdc-notched-outline')
			?.shadowRoot?.querySelector('.mdc-notched-outline')
			?.classList.add('vvd-notch');
		associateWithForm<VWCTextField>(this, this.formElement);
		submitOnEnter((this as unknown) as HTMLInputElement);
		handleAutofocus(this);
		listHandler.call(this);
	}

	updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
		if (this.shape === 'pill') {
			this.dense = true;
		}
	}

	protected renderIcon(icon: string, isTrailingIcon = false): TemplateResult {
		const classes = {
			'mdc-text-field__icon--leading': !isTrailingIcon,
			'mdc-text-field__icon--trailing': isTrailingIcon,
		};

		return html`<vwc-icon
			type="${icon}"
			size="small"
			class="${mapToClasses(classes).join(' ')}"
		></vwc-icon>`;
	}

	protected renderRipple(): TemplateResult {
		return html``;
	}

	protected renderLineRipple(): TemplateResult {
		return html``;
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
		const validationMessage = showValidationMessage
			? this.validationMessage
			: this.helper;
		const classes = mapToClasses(classesMap).join(' ');
		return html`
			<div class="mdc-text-field-helper-line">
				<vwc-icon
					class="mdc-text-field-helper-icon"
					type="info-negative"
					size="small"
				></vwc-icon>
				<span class="spacer"></span>
				<div class="mdc-text-field-helper-text ${classes}">
					${validationMessage}
				</div>
				${charCounterTemplate}
			</div>
		`;
	}
}
