import { customElement, property } from 'lit-element';
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

export type ButtonShape = 'rounded' | 'pill';

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: String, reflect: true }) shape: ButtonShape = 'rounded';

	protected updated(): void {
		const innerButton = this.shadowRoot?.querySelector('.mdc-button');
		innerButton?.classList[this.shape === 'pill' ? 'add' : 'remove']('mdc-button--pill');
		innerButton?.classList[this.shape === 'rounded' ? 'add' : 'remove']('mdc-button--rounded');
	}
}
