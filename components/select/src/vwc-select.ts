import { customElement, property, html, TemplateResult } from 'lit-element';
import '@vonage/vwc-notched-outline';
import '@vonage/vwc-icon';
import { mapToClasses } from '@vonage/vvd-foundation/class-utils.js';
import { Select as MWCSelect } from '@material/mwc-select';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcSelectStyle } from './vwc-select.css';
import { style as mwcSelectStyle } from '@material/mwc-select/mwc-select-css.js';
import { addInputToForm } from '@vonage/vvd-foundation/form-association';

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
	
	@property({ type: HTMLInputElement, reflect: false })
	hiddenInput: HTMLInputElement | undefined;

	@property({ type: String, reflect: true })
	form: string | undefined;

	@property({ type: String, reflect: true })
	name: string | undefined;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.replaceIcon();
		addInputToForm(this);
	}

	protected renderHelperText(): TemplateResult {
		if (!this.shouldRenderHelperText) {
			return html``;
		}

		const showValidationMessage = this.validationMessage && !this.isUiValid;
		const classesMap = {
			'mdc-select-helper-text--validation-msg': showValidationMessage,
		};

		return html`
			<div class="mdc-select-helper-line">
				<vwc-icon class="mdc-select-helper-icon" type="info-negative" size="small"></vwc-icon>
				<span class="spacer"></span>
				<div id="helper-text" class="mdc-select-helper-text ${mapToClasses(classesMap).join(' ')}"
				>${showValidationMessage ? this.validationMessage : this.helper}</div>
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

    return html`
      <vwc-notched-outline class="mdc-notched-outline vvd-notch">
        ${this.renderLabel()}
      </vwc-notched-outline>`;
  }
}
