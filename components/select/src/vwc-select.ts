import '@vonage/vvd-core';
import '@vonage/vwc-helper-message';
import '@vonage/vwc-icon';
import '@vonage/vwc-notched-outline';
import {
	customElement,
	property,
	html,
	TemplateResult
} from 'lit-element';
import type { PropertyValues } from 'lit-element';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css.js';
import { styles as mwcSelectStyles } from '@material/mwc-select/mwc-select.css.js';
import { associateWithForm } from '@vonage/vvd-foundation/form-association.js';
import type { Shape, Appearance } from '@vonage/vvd-foundation/constants.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
//import {ClassInfo, classMap} from 'lit-html/directives/class-map';

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

type SelectAppearance = Extract<Appearance, Appearance.Ghost | Appearance.Filled>;

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

	@property({ type: Boolean, reflect: true, attribute: 'ghost' })
		ghost = false;

	@property({ type: String, reflect: true })
		appearance?: SelectAppearance;

	protected getRenderClasses() {
		return {
			[`appearance-${this.appearance}`]: !!this.appearance,
		};
	}


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
		if (this.shape === 'pill' || this.ghost) {
			this.dense = true;
		}
		//class = `layout-${this.appearance}`: !!this.appearance;
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

	protected override renderHelperText(): TemplateResult | string {
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

	protected override renderLeadingIcon(): TemplateResult | string {
		if (!this.icon) {
			return '';
		}
		return html`<vwc-icon class="vvd-select-icon" type="${this.icon}"></vwc-icon>`;
	}

	protected override renderOutline(): TemplateResult | Record<string, unknown> {
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
