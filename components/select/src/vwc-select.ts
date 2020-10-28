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
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css';
import { style as mwcSelectStyle } from '@material/mwc-select/mwc-select-css.js';
import { associateWithForm } from '@vonage/vvd-foundation/form-association';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-select': VWCSelect;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSelect.styles = [styleCoupling, mwcSelectStyle, vwcSelectStyle];

const shapes = ['rounded', 'pill'] as const;
export type SelectShape = typeof shapes;

/**
 * This component is an extension of [<mwc-select>](https://github.com/material-components/material-components-web-components/tree/master/packages/select)
 */
@customElement('vwc-select')
export class VWCSelect extends MWCSelect {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: String, reflect: true })
	shape: SelectShape[number] = 'rounded';

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true })
	name: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.replaceIcon();
		associateWithForm<VWCSelect>(this, this.formElement);
		handleAutofocus(this);
	}

	protected updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
		if (this.shape === 'pill') {
			this.dense = true;
		}
	}

	protected renderHelperText(): TemplateResult {
		if (!this.shouldRenderHelperText) {
			return html``;
		}

		const showValidationMessage = this.validationMessage && !this.isUiValid;
		const classesMap = {
			'mdc-select-helper-text--validation-msg': showValidationMessage,
		};

		const classes = ['mdc-select-helper-text', ...mapToClasses(classesMap)].join(
			' '
		);
		const validationMessage = showValidationMessage
			? this.validationMessage
			: this.helper;
		return html`
			<div class="mdc-select-helper-line">
				<vwc-icon
					class="mdc-select-helper-icon"
					type="info-negative"
					size="small"
				></vwc-icon>
				<span class="spacer"></span>
				<div id="helper-text" class="${classes}">${validationMessage}</div>
			</div>
		`;
	}

	private replaceIcon(): void {
		const ddIconClass = 'mdc-select__dropdown-icon';
		const chevronIcon = document.createElement('vwc-icon');
		chevronIcon.classList.add(ddIconClass);
		chevronIcon.setAttribute('type', 'down');
		this.shadowRoot?.querySelector(`.${ddIconClass}`)?.replaceWith(chevronIcon);
	}

	protected renderOutline(): TemplateResult | Record<string, unknown> {
		if (!this.outlined) {
			return {};
		}

		return html` <vwc-notched-outline class="mdc-notched-outline vvd-notch">
			${this.renderLabel()}
		</vwc-notched-outline>`;
	}
}
