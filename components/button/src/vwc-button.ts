import { customElement } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style as mwcButtonStyle } from '@material/mwc-button/mwc-button-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button': VWCButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCButton.styles = [styleCoupling, mwcButtonStyle];

@customElement('vwc-button')
export class VWCButton extends MWCButton {}
