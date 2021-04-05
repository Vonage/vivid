import '@vonage/vvd-core';
import { customElement, html, TemplateResult } from 'lit-element';
import { Radio as MWCRadio } from '@material/mwc-radio';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-couplings.css';
import { style as vwcRadioStyle } from './vwc-radio.css';
import { style as mwcRadioStyle } from '@material/mwc-radio/mwc-radio-css.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-radio': VWCRadio;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadio.styles = [styleCoupling, mwcRadioStyle, vwcRadioStyle];

/**
 * This component is an extension of [<mwc-radio>](https://github.com/material-components/material-components-web-components/tree/master/packages/radio)
 */
@customElement('vwc-radio')
export class VWCRadio extends MWCRadio {
	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	protected renderRipple(): TemplateResult {
		return html``;
	}
}
