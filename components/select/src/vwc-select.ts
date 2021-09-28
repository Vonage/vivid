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
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { style as vwcSelectStyle } from './vwc-select.css';
import { styles as mwcSelectStyles } from '@material/mwc-select/mwc-select.css.js';
import { associateWithForm } from '@vonage/vvd-foundation/form-association';
import type { Shape } from '@vonage/vvd-foundation/constants';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

const DROPDOWN_ICON_CLASS = 'vvd-select-dropdown-icon';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSelect.styles = [styleCoupling, mwcSelectStyles, vwcSelectStyle];

type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * This component is an extension of [<mwc-select>](https://github.com/material-components/material-components-web-components/tree/master/packages/select)
 */
@customElement('vwc-select')
export class VWCSelect extends MWCSelect {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape?: SelectShape;

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true })
	name: string | undefined;

	connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('outlined')) {
			this.outlined = true;
		}
	}

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.replaceDropDownIcon();
		associateWithForm(this, this.formElement);
		handleAutofocus(this);
	}

	protected update(changedProperties: PropertyValues): void {
		super.update(changedProperties);
		if (this.shape === 'pill') {
			this.dense = true;
		}
	}

	protected updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
		const selectedText = this.shadowRoot?.querySelector(
			'.mdc-select__selected-text'
		);
		if (selectedText) {
			selectedText.setAttribute('aria-label', 'current selection');
			selectedText.setAttribute('role', 'textbox');
		}
	}

	protected renderHelperText(): TemplateResult | string {
		if (!this.shouldRenderHelperText) {
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

	protected renderLeadingIcon(): TemplateResult | string {
		if (!this.icon) {
			return '';
		}
		return html`<vwc-icon class="vvd-select-icon" type="${this.icon}"></vwc-icon>`;
	}

	protected renderOutline(): TemplateResult | Record<string, unknown> {
		if (!this.outlined) {
			return {};
		}

		return html`<vwc-notched-outline class="mdc-notched-outline vvd-notch">
			${this.renderLabel()}
		</vwc-notched-outline>`;
	}

	private replaceDropDownIcon(): void {
		const chevronIcon = document.createElement('vwc-icon');
		chevronIcon.classList.add(DROPDOWN_ICON_CLASS);
		chevronIcon.setAttribute('type', 'down');
		this.shadowRoot?.querySelector('.mdc-select__dropdown-icon')?.replaceWith(chevronIcon);
	}
}
