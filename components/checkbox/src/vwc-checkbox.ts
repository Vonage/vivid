import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Checkbox as MWCCheckbox } from '@material/mwc-checkbox';
import { style as vwcCheckboxStyle } from './vwc-checkbox.css';
import { style as mwcCheckboxStyle } from '@material/mwc-checkbox/mwc-checkbox-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-checkbox': VWCCheckbox;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckbox.styles = [styleCoupling, mwcCheckboxStyle, vwcCheckboxStyle];

/**
 * This component is an extension of [<mwc-checkbox>](https://github.com/material-components/material-components-web-components/tree/master/packages/checkbox)
 */
@customElement('vwc-checkbox')
export class VWCCheckbox extends MWCCheckbox {
	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}
}
