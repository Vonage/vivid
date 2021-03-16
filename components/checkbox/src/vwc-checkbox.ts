import '@vonage/vvd-core';
import { customElement, html, TemplateResult } from 'lit-element';
import { Checkbox as MWCCheckbox } from '@material/mwc-checkbox';
import { style as vwcCheckboxStyle } from './vwc-checkbox.css';
import { style as mwcCheckboxStyle } from '@material/mwc-checkbox/mwc-checkbox-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

export const CHECKBOX_COMPONENT = 'vwc-checkbox';

declare global {
	interface HTMLElementTagNameMap {
		[CHECKBOX_COMPONENT]: VWCCheckbox;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckbox.styles = [styleCoupling, mwcCheckboxStyle, vwcCheckboxStyle];

/**
 * This component is an extension of [<mwc-checkbox>](https://github.com/material-components/material-components-web-components/tree/master/packages/checkbox)
 */
@customElement(CHECKBOX_COMPONENT)
export class VWCCheckbox extends MWCCheckbox {
	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	focus(): void {
		super.focus();
		this.formElement.focus();
	}

	protected renderRipple(): TemplateResult {
		return html``;
	}
}
