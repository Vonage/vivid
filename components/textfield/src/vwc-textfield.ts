import '@vonage/vvd-core';
import '@vonage/vwc-helper-message';
import '@vonage/vwc-icon';
import '@vonage/vwc-notched-outline';
import {
	customElement,
	property,
	html,
	TemplateResult,
	PropertyValues,
} from 'lit-element';
import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { style as mwcTextFieldStyle } from '@material/mwc-textfield/mwc-textfield-css.js';
import { Shape } from '@vonage/vvd-foundation/constants';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';
export { TextFieldType } from '@material/mwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-textfield': VWCTextField;
	}
}

type TextfieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];

const INPUT_ELEMENT_SLOT_NAME = 'formInputElement';
@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape?: TextfieldShape;

	@property({ type: String, reflect: true })
	form: string | undefined;

	constructor() {
		super();
		Object.defineProperty(this, 'formElement', {
			value: this.createInputElement(),
		});
		Object.defineProperty(this, 'value', {
			get: function () {
				return this.formElement.value;
			},
			set: function (newValue: string) {
				this.formElement.value = newValue;
				this.layout();
			},
		});
	}

	connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('outlined')) {
			this.outlined = true;
		}
		this.formElement.value = this.value;
		this.appendChild(this.formElement);
	}

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot
			?.querySelector('.mdc-notched-outline')
			?.shadowRoot?.querySelector('.mdc-notched-outline')
			?.classList.add('vvd-notch');
		handleAutofocus(this);
	}

	updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
		if (this.shape === 'pill') {
			this.dense = true;
		}
	}

	protected renderInput(shouldRenderHelperText: boolean): TemplateResult {
		this.updateInputElement(shouldRenderHelperText);
		return html`
			<div class="mdc-text-field__input"></div>
			<slot name="${INPUT_ELEMENT_SLOT_NAME}"></slot>
		`;
	}

	protected renderIcon(icon: string, isTrailingIcon = false): TemplateResult {
		const iconClass = isTrailingIcon
			? 'mdc-text-field__icon--trailing'
			: 'mdc-text-field__icon--leading';

		return html`<vwc-icon
			type="${icon}"
			size="small"
			class="${iconClass}"
		></vwc-icon>`;
	}

	protected renderOutline(): TemplateResult | string {
		return !this.outlined
			? ''
			: html`<vwc-notched-outline class="mdc-notched-outline vvd-notch">
					${this.renderLabel()}
			  </vwc-notched-outline>`;
	}

	protected renderHelperText(
		shouldRenderHelperText: boolean
	): TemplateResult | string {
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

	protected renderRipple(): TemplateResult {
		return html``;
	}

	protected renderLineRipple(): TemplateResult {
		return html``;
	}

	private createInputElement(): HTMLInputElement {
		const element = document.createElement('input');
		const defaultValue = this.getAttribute('value');
		element.defaultValue = defaultValue ? defaultValue : '';
		element.setAttribute('slot', INPUT_ELEMENT_SLOT_NAME);
		return element;
	}

	private updateInputElement(shouldRenderHelperText: boolean): void {
		const fe = this.formElement;

		//	event listeners
		fe.onfocus = this.onInputFocus.bind(this);
		fe.onblur = this.onInputBlur.bind(this);

		//	attributes
		setAttributeIfDefined('id', this.id, fe);
		setAttributeIfDefined('name', this.name, fe);
		setAttributeIfDefined('type', this.type, fe);
		setAttributeIfDefined('form', this.form, fe);
		setAttributeIfDefined('placeholder', this.placeholder, fe);

		setAttributeIfDefined('min', this.min, fe);
		setAttributeIfDefined('max', this.max, fe);
		setAttributeIfDefined('step', this.step, fe);
		setAttributeIfDefined('size', this.size, fe);

		const autoCapOrNone = this.autocapitalize ? this.autocapitalize : undefined;
		const minOrNone = this.minLength === -1 ? undefined : this.minLength;
		const maxOrNone = this.maxLength === -1 ? undefined : this.maxLength;
		setAttributeIfDefined('autocapitalize', autoCapOrNone, fe);
		setAttributeIfDefined('minlength', minOrNone, fe);
		setAttributeIfDefined('maxlength', maxOrNone, fe);
		setAttributeIfDefined('pattern', this.pattern, fe);
		setAttributeIfDefined('inputmode', this.inputMode, fe);

		addAttributeByCondition('disabled', this.disabled, fe);
		addAttributeByCondition('readonly', this.readOnly, fe);
		addAttributeByCondition('required', this.required, fe);

		const ariaLabel = shouldRenderHelperText ? 'helper-text' : undefined;
		const ariaError =
			this.validationMessage && !this.isUiValid ? 'helper-text' : undefined;
		setAttributeIfDefined('aria-controls', ariaLabel, fe);
		setAttributeIfDefined('aria-describedby', ariaLabel, fe);
		setAttributeIfDefined('aria-errortext', ariaError, fe);
	}
}

function addAttributeByCondition(
	attributeName: string,
	condition: boolean,
	target: HTMLInputElement
): void {
	if (condition) {
		target.setAttribute(attributeName, '');
	} else {
		target.removeAttribute(attributeName);
	}
}

function setAttributeIfDefined(
	attributeName: string,
	value: unknown,
	target: HTMLInputElement
): void {
	if (value) {
		target.setAttribute(attributeName, String(value));
	} else {
		target.removeAttribute(attributeName);
	}
}
