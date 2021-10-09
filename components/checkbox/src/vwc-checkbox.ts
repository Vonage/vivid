import '@vonage/vvd-core';
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators';
import { Checkbox as MWCCheckbox } from '@material/mwc-checkbox';
import { style as vwcCheckboxStyle } from './vwc-checkbox.css.js';
import { styles as mwcCheckboxStyles } from '@material/mwc-checkbox/mwc-checkbox.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

export const COMPONENT_NAME = 'vwc-checkbox';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-checkbox': VWCCheckbox;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckbox.styles = [styleCoupling, mwcCheckboxStyles, vwcCheckboxStyle];

/**
 * This component is an extension of [<mwc-checkbox>](https://github.com/material-components/material-components-web-components/tree/master/packages/checkbox)
 */
@customElement('vwc-checkbox')
export class VWCCheckbox extends MWCCheckbox {
	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	override focus(): void {
		super.focus();
		this.formElement.focus();
	}

	protected override renderRipple(): TemplateResult {
		return html``;
	}
}
