import '@vonage/vvd-core';
import '@vonage/vwc-helper-message';
import '@vonage/vwc-icon';
import '@vonage/vwc-notched-outline';
import {
	html, PropertyValues,	nothing,
} from 'lit';
import { customElement,	property } from 'lit/decorators';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css.js';
import { styles as mwcSelectStyles } from '@material/mwc-select/mwc-select.css.js';
import { associateWithForm } from '@vonage/vvd-foundation/form-association.js';
import type { Shape } from '@vonage/vvd-foundation/constants.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';

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

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('outlined')) {
			this.outlined = true;
		}
	}

	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.replaceDropDownIcon();
		associateWithForm(this, this.formElement);
		handleAutofocus(this);
	}

	protected override update(changedProperties: PropertyValues): void {
		super.update(changedProperties);
		if (this.shape === 'pill') {
			this.dense = true;
		}
	}

	protected override updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
		const selectedText = this.shadowRoot?.querySelector(
			'.mdc-select__selected-text'
		);
		if (selectedText) {
			selectedText.setAttribute('aria-label', 'current selection');
			selectedText.setAttribute('role', 'textbox');
		}
	}

	protected override renderHelperText() {
		if (!this.shouldRenderHelperText) {
			return nothing;
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

	protected override renderLeadingIcon() {
		if (!this.icon) {
			return nothing;
		}
		return html`<vwc-icon class="vvd-select-icon" type="${this.icon}"></vwc-icon>`;
	}

	protected override renderOutline() {
		if (!this.outlined) {
			return nothing;
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
