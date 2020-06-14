import { customElement } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css';
import { style as mwcButtonStyle } from '@material/mwc-button/mwc-button-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button': VWCButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCButton.styles = [styleCoupling, mwcButtonStyle, vwcButtonStyle];

/**
 * Here is a description of my web component.
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 *
 * @element vwc-button
 *
 * @attr {Boolean} unelevated - default state (background)
 * @attr {Boolean} outlined - outlined flavor (border, no background)
 * @attr {Boolean} disabled - disabled view
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {}
