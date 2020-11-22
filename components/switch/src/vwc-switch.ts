import '@vonage/vvd-core';
import { customElement, property, html, TemplateResult } from 'lit-element';
import { Switch as MWCSwitch } from '@material/mwc-switch';
import { style as vwcSwitchStyle } from './vwc-switch.css';
import { style as mwcSwitchStyle } from '@material/mwc-switch/mwc-switch-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-switch': VWCSwitch;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSwitch.styles = [styleCoupling, mwcSwitchStyle, vwcSwitchStyle];

const connotations = ['primary', 'cta', 'success', 'alert'] as const;
export type SwitchConnotation = typeof connotations;

/**
 * This component is an extension of [<mwc-switch>](https://github.com/material-components/material-components-web-components/tree/master/packages/switch)
 */
@customElement('vwc-switch')
export class VWCSwitch extends MWCSwitch {
	@property({ type: String, reflect: true })
	connotation?: SwitchConnotation[number];

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	protected renderRipple(): TemplateResult {
		return html``;
	}
}
