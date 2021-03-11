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
const INPUT_ELEMENT_CLASS_NAME = 'vivid-input-internal';
const MDC_FLOAT_ABOVE_CLASS_NAME = 'mdc-floating-label--float-above';

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape?: TextfieldShape;

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true, converter: v => v || ' ' })
	placeholder = ' ';

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
				this.floatLabel();
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
		this.formElement.addEventListener('transitionend', () => {
			this.floatLabel();
		});
		this.floatLabel();
	}

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot
			?.querySelector('.mdc-notched-outline')
			?.shadowRoot?.querySelector('.mdc-notched-outline')
			?.classList.add('vvd-notch');
		this.floatLabel();
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

		return html`
			<span class="${iconClass}">
				<vwc-icon type="${icon}" size="small"></vwc-icon>
			</span>
		`;
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
		element.defaultValue = defaultValue || '';
		element.setAttribute('slot', INPUT_ELEMENT_SLOT_NAME);
		element.className = INPUT_ELEMENT_CLASS_NAME;
		return element;
	}

	private updateInputElement(shouldRenderHelperText: boolean): void {
		const fe = this.formElement;

		//	event listeners
		fe.onfocus = () => {
			this.dispatchEvent(new FocusEvent('focus', { composed: true }));
			this.onInputFocus();
		};

		fe.onblur = () => {
			this.dispatchEvent(new FocusEvent('blur', { composed: true }));
			this.onInputBlur();
		};

		//	attributes
		setAttributeByValue('id', this.id, fe);
		setAttributeByValue('name', this.name, fe);
		setAttributeByValue('type', this.type, fe);
		setAttributeByValue('form', this.form, fe);
		setAttributeByValue('placeholder', this.placeholder, fe);

		setAttributeByValue('min', this.min, fe);
		setAttributeByValue('max', this.max, fe);
		setAttributeByValue('step', this.step, fe);
		setAttributeByValue('size', this.size, fe);

		const autoCapOrNone = this.autocapitalize ? this.autocapitalize : undefined;
		const minOrNone = this.minLength === -1 ? undefined : this.minLength;
		const maxOrNone = this.maxLength === -1 ? undefined : this.maxLength;
		setAttributeByValue('autocapitalize', autoCapOrNone, fe);
		setAttributeByValue('minlength', minOrNone, fe);
		setAttributeByValue('maxlength', maxOrNone, fe);
		setAttributeByValue('pattern', this.pattern, fe);
		setAttributeByValue('inputmode', this.inputMode, fe);

		setAttributeByValue('disabled', this.disabled, fe, true);
		setAttributeByValue('readonly', this.readOnly, fe, true);
		setAttributeByValue('required', this.required, fe, true);

		const ariaLabel = shouldRenderHelperText ? 'helper-text' : undefined;
		const ariaError =
			this.validationMessage && !this.isUiValid ? 'helper-text' : undefined;
		setAttributeByValue('aria-controls', ariaLabel, fe);
		setAttributeByValue('aria-describedby', ariaLabel, fe);
		setAttributeByValue('aria-errortext', ariaError, fe);
	}

	private floatLabel(): void {
		const fle = this.shadowRoot?.querySelector('.mdc-floating-label');
		const isUp = this.value || this.focused;
		if (!fle) {
			return;
		}
		if (isUp) {
			fle.classList.add(MDC_FLOAT_ABOVE_CLASS_NAME);
		} else {
			fle.classList.remove(MDC_FLOAT_ABOVE_CLASS_NAME);
		}
	}
}

function setAttributeByValue(
	attributeName: string,
	value: unknown,
	target: HTMLInputElement,
	asEmpty = false
): void {
	if (value) {
		target.setAttribute(attributeName, asEmpty ? '' : String(value));
	} else {
		target.removeAttribute(attributeName);
	}
}
