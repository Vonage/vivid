import '@vonage/vvd-core';
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators';
import { Radio as MWCRadio } from '@material/mwc-radio';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { style as vwcRadioStyle } from './vwc-radio.css.js';
import { styles as mwcRadioStyles } from '@material/mwc-radio/mwc-radio.css.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-radio': VWCRadio;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadio.styles = [styleCoupling, mwcRadioStyles, vwcRadioStyle];

/**
 * This component is an extension of [<mwc-radio>](https://github.com/material-components/material-components-web-components/tree/master/packages/radio)
 */
@customElement('vwc-radio')
export class VWCRadio extends MWCRadio {
	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	protected override renderRipple(): TemplateResult {
		return html``;
	}
}
