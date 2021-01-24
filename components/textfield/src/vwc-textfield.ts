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
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
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

	// autofill refactor enhancements

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

	protected renderInput(): TemplateResult {
		this.updateInputElement();
		return html`
			<div class="mdc-text-field__input"></div>
			<slot name="${INPUT_ELEMENT_SLOT_NAME}"></slot>
		`;
	}

	private createInputElement(): HTMLInputElement {
		const element = document.createElement('input');
		const defaultValue = this.getAttribute('value');
		element.defaultValue = defaultValue ? defaultValue : '';
		element.setAttribute('slot', INPUT_ELEMENT_SLOT_NAME);
		return element;
	}

	//	not yet implemented:
	// aria-controls="${ifDefined(ariaControlsOrUndef)}"
	// aria-describedby="${ifDefined(ariaDescribedbyOrUndef)}"
	// aria-errortext="${ifDefined(ariaErrortextOrUndef)}"
	// autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
	private updateInputElement(): void {
		const fe = this.formElement;

		//	event listeners
		fe.onfocus = this.onInputFocus.bind(this);
		fe.onblur = this.onInputBlur.bind(this);

		//	attributes - basic
		setAttributeIfDefined('id', this.id, fe);
		setAttributeIfDefined('name', this.name, fe);
		setAttributeIfDefined('type', this.type, fe);
		setAttributeIfDefined('form', this.form, fe);
		setAttributeIfDefined('placeholder', this.placeholder, fe);

		setAttributeIfDefined('min', this.min, fe);
		setAttributeIfDefined('max', this.max, fe);
		setAttributeIfDefined('step', this.step, fe);
		setAttributeIfDefined('size', this.size, fe);

		setAttributeIfDefined('inputmode', this.inputMode, fe);
		setAttributeIfDefined(
			'minlength',
			this.minLength === -1 ? undefined : this.minLength,
			fe
		);
		setAttributeIfDefined(
			'maxlength',
			this.maxLength === -1 ? undefined : this.maxLength,
			fe
		);
		setAttributeIfDefined('pattern', this.pattern, fe);

		addAttributeByCondition('disabled', this.disabled, fe);
		addAttributeByCondition('readonly', this.readOnly, fe);
		addAttributeByCondition('required', this.required, fe);
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
