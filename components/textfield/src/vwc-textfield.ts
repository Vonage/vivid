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

type TextfieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTextField.styles = [styleCoupling, mwcTextFieldStyle, vwcTextFieldStyle];
const INPUT_ELEMENT_SLOT_NAME = "formInputElement";
@customElement('vwc-textfield')
export class VWCTextField extends MWCTextField {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape?: TextfieldShape;

	@property({ type: String, reflect: true })
	form: string | undefined;
	#lightFormElement: HTMLInputElement | null = null;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.shadowRoot
			?.querySelector('.mdc-notched-outline')
			?.shadowRoot?.querySelector('.mdc-notched-outline')
			?.classList.add('vvd-notch');
		associateWithForm(this, this.formElement);
		submitOnEnter((this as unknown) as HTMLInputElement);
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

	protected renderInput(): TemplateResult {
		this.formElement.setAttribute('value', this.value);
		return html`<slot name="${INPUT_ELEMENT_SLOT_NAME}"></slot>`;
	}

	connectedCallback() {
		super.connectedCallback();

		if (!this.formElement) {
			if (this.#lightFormElement = createInputElement()) {
				this.#lightFormElement.oninput = (event) => {
					this.value = (event.target as unknown as HTMLInputElement).value;
				};
				Object.defineProperty(this, 'formElement', {
					get: () => { return this.#lightFormElement }
				});
				this.appendChild(this.formElement);
			}
		}
	}
}

function createInputElement(): HTMLInputElement {
	const element = document.createElement('input');
	element.setAttribute('slot', INPUT_ELEMENT_SLOT_NAME);
	element.classList.add('mdc-text-field__input');
	return element;
}
