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

const fillMeans = ['', 'normal', 'call-to-action', 'success', 'error', 'warning'] as const;
export type ButtonFillMean = typeof fillMeans;

const shapes = ['rounded', 'pill'] as const;
export type ButtonShape = typeof shapes;

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: String, reflect: true }) fill: ButtonFillMean[number] | undefined;

	@property({ type: String, reflect: true }) shape: ButtonShape[number] = 'rounded';

	protected updated(): void {
		const fillMean = this.fill === '' ? 'normal' : this.fill;
		const shape = this.shape ?? 'rounded';
		const innerButton = this.shadowRoot?.querySelector('.mdc-button');

		if (fillMean === undefined) {
			this.removeAttribute('unelevated');
		} else {
			this.setAttribute('unelevated', '');
		}
		if (innerButton) {
			//	get existing classes aside from the DOM
			const classesSet = new Set(innerButton.classList);

			//	merge/unmerge new ones
			classesSet[fillMean === undefined ? 'delete' : 'add']('filled');
			fillMeans.forEach(fm => classesSet[fillMean === fm ? 'add' : 'delete'](fm));
			shapes.forEach(s => classesSet[shape === s ? 'add' : 'delete'](s));

			//	set the clases back to the DOM
			innerButton.className = Array.from(classesSet).join(' ');
		}
	}
}
