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

const layouts = ['text', 'outlined', 'filled'];
export type ButtonLayout = typeof layouts;

const meanings = ['regular', 'call-to-action', 'success', 'error', 'warning'] as const;
export type ButtonMeaning = typeof meanings;

const shapes = ['rounded', 'pill'] as const;
export type ButtonShape = typeof shapes;

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: String, reflect: true }) layout: ButtonLayout[number] = 'text';

	@property({ type: String, reflect: true }) meaning?: ButtonMeaning[number] | undefined;

	@property({ type: String, reflect: true }) shape: ButtonShape[number] = 'rounded';

	protected updated(): void {
		const layout: ButtonLayout[number] = this.layout;
		const meaning: ButtonMeaning[number] | undefined = this.layout === 'filled' ? (this.meaning ?? 'regular') : undefined;
		const shape: ButtonShape[number] = this.shape ?? 'rounded';

		const innerButton = this.shadowRoot?.querySelector('.mdc-button');

		if (innerButton) {
			//	get existing classes aside from the DOM
			const classesSet = new Set(innerButton.classList);

			//	merge classes
			this.toggleAttribute('outlined', layout === 'outlined');
			this.toggleAttribute('unelevated', layout === 'filled');
			if (layout === 'filled') {
				meanings.forEach(m => classesSet[meaning === m ? 'add' : 'delete'](m));
			}
			shapes.forEach(s => classesSet[shape === s ? 'add' : 'delete'](s));

			//	set the clases back to the DOM
			innerButton.className = Array.from(classesSet).join(' ');
		}
	}
}
