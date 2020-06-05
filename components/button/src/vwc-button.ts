import '@vonage/vvd-core';
import { css, CSSResult, customElement } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style } from './vwc-button.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button': VWCButton;
	}
}

@customElement('vwc-button')
export class VWCButton extends MWCButton { 
	static get styles(): CSSResult {
		return css`
			${super.styles}
			${style}
		`;
	}
}
