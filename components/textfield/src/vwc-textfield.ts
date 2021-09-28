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
	queryAssignedNodes,
	query,
	internalProperty
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { TextField as MWCTextField } from '@material/mwc-textfield';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { style as vwcTextFieldStyle } from './vwc-textfield.css';
import { styles as mwcTextFieldStyles } from '@material/mwc-textfield/mwc-textfield.css.js';
import type { Shape } from '@vonage/vvd-foundation/constants';
import { debounced, handleAutofocus } from '@vonage/vvd-foundation/general-utils';

export { TextFieldType } from '@material/mwc-textfield';

export const COMPONENT_NAME = 'vwc-textfield';
export const VALID_BUTTON_ELEMENTS = ['vwc-icon-button'];

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCTextField;
	}
}

type TextfieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyles, vwcTextFieldStyle];

const INPUT_ELEMENT_SLOT_NAME = 'formInputElement';
const INPUT_ELEMENT_CLASS_NAME = 'vivid-input-internal';
const MDC_FLOAT_ABOVE_CLASS_NAME = 'mdc-floating-label--float-above';

@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({
		type: Boolean,
		reflect: true,
		attribute: 'no-actions-sync'
	})
	noActionsSync = false;

	@property({
		type: Boolean,
		reflect: true
	})
	dense = false;

	@property({
		type: String,
		reflect: true
	})
	shape?: TextfieldShape;

	@property({
		type: String,
		reflect: true
	})
	form: string | undefined;

	@property({
		type: String,
		reflect: true,
		converter: v => v || ' '
	})
	placeholder = ' ';
	@query('.mdc-text-field__input') protected inputElementWrapper!: HTMLInputElement;
	@internalProperty()
	private hasActionButtons = false;
	@queryAssignedNodes('action', true, VALID_BUTTON_ELEMENTS.join(', '))
	private actionButtons?: NodeListOf<HTMLElement>;

	private inputResizeObserver?: ResizeObserver;

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
				this.requestUpdate('value', null);
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
			?.classList
			.add('vvd-notch');
		this.floatLabel();
		handleAutofocus(this);
		this.observeInputSize();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.inputResizeObserver?.disconnect();
	}

	updated(changes: PropertyValues): void {
		super.updated(changes);
		if (this.shape === 'pill') {
			this.dense = true;
		}
		if (
			changes.has('disabled') ||
			changes.has('shape') ||
			changes.has('dense')
		) {
			this.enforcePropsOnActionNodes();
		}
	}

	/** @soyTemplate */
	render(): TemplateResult {
		const shouldRenderCharCounter = this.charCounter && this.maxLength !== -1;
		const shouldRenderHelperText =
			!!this.helper || !!this.validationMessage || shouldRenderCharCounter;

		/** @classMap */
		const classes = {
			'mdc-text-field--disabled': this.disabled,
			'mdc-text-field--no-label': !this.label,
			'mdc-text-field--filled': !this.outlined,
			'mdc-text-field--outlined': this.outlined,
			'mdc-text-field--with-leading-icon': this.icon,
			'mdc-text-field--with-trailing-icon': this.iconTrailing,
			'mdc-text-field--end-aligned': this.endAligned,
			'vvd-text-field--with-action': this.hasActionButtons,
		};

		return html`
			<label class="mdc-text-field ${classMap(classes)}">
				${this.renderRipple()}
				${this.outlined ? this.renderOutline() : this.renderLabel()}
				${this.renderLeadingIcon()}
				${this.renderPrefix()}
				${this.renderInput(shouldRenderHelperText)}
				${this.renderSuffix()}
				${this.renderTrailingIcon()}
				<slot name="action" @slotchange="${this.onActionSlotChange}"></slot>
				${this.renderLineRipple()}
			</label>
			${this.renderHelperText(shouldRenderHelperText)}
		`;
	}

	protected observeInputSize(): void {
		// eslint-disable-next-line compat/compat
		this.inputResizeObserver = new ResizeObserver(() => {
			this.syncInputSize();
		});
		this.inputResizeObserver.observe(this.inputElementWrapper);
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
			: html`
				<vwc-notched-outline class="mdc-notched-outline vvd-notch">
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

		return html`
			<vwc-helper-message
				id="helper-text"
				class="helper-message"
				?disabled="${this.disabled}"
				?is-error="${isError}"
			>${text}
			</vwc-helper-message
			>`;
	}

	protected renderRipple(): TemplateResult {
		return html``;
	}

	protected renderLineRipple(): TemplateResult {
		return html``;
	}

	protected onActionSlotChange(): void {
		this.hasActionButtons = Boolean(this.actionButtons?.length);
		this.enforcePropsOnActionNodes();
	}

	protected enforcePropsOnActionNodes(): void {
		const buttons = Array.from(this.actionButtons || []);

		buttons.forEach((button) => {
			if (!this.noActionsSync) {
				button.toggleAttribute('disabled', this.disabled);
			}
			button.toggleAttribute('dense', this.dense);

			const buttonShape = this.shape == 'pill'
				? 'circled'
				: this.shape;
			if (buttonShape) {
				button.setAttribute('shape', buttonShape);
			} else {
				button.removeAttribute('shape');
			}
		});
	}

	@debounced(50)
	private syncInputSize() {
		const {
			width: hostWidth,
			left: hostLeft
		} = this.getBoundingClientRect();
		const {
			width: wrapperWidth,
			left: wrapperLeft
		} = this.inputElementWrapper.getBoundingClientRect();
		const paddingLeft = wrapperLeft - hostLeft;
		const paddingRight = hostWidth - wrapperWidth - paddingLeft;
		requestAnimationFrame(() => {
			this.formElement.style.paddingLeft = `${paddingLeft}px`;
			this.formElement.style.paddingRight = `${paddingRight}px`;
		});
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

		fe.oninput = (e) => {
			e.stopImmediatePropagation();
			this.dispatchEvent(new InputEvent('input', { bubbles: true }));
			this.handleInputChange();
		};

		//	attributes
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

const setAttributeByValue = (function () {
	const NOT_ASSIGNED = Symbol('NotAssigned');
	return function (
		attributeName: string,
		value: unknown,
		target: HTMLInputElement,
		asEmpty = false
	): void {
		const newValue: unknown = value
			? (() => {
				return asEmpty ? '' : String(value);
			})()
			: NOT_ASSIGNED;

		const currentValue: unknown = target.hasAttribute(attributeName)
			? target.getAttribute(attributeName)
			: NOT_ASSIGNED;

		if (newValue !== currentValue) {
			if (newValue === NOT_ASSIGNED) {
				target.removeAttribute(attributeName);
			} else {
				target.setAttribute(attributeName, newValue as string);
			}
		}
	};
}());
