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

const connotations = ['regular', 'cta', 'success', 'error'] as const;
export type ButtonConnotation = typeof connotations;

const shapes = ['rounded', 'pill'] as const;
export type ButtonShape = typeof shapes;

const types = ['submit', 'reset', 'button'] as const;
export type ButtonTYpe = typeof types;

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: String, reflect: true })
	layout: ButtonLayout[number] = 'text';

	@property({ type: String, reflect: true })
	connotation?: | ButtonConnotation[number] | undefined;

	@property({ type: String, reflect: true })
	shape: ButtonShape[number] = 'rounded';

	@property({type: String, reflect: true})
	type: ButtonTYpe[number] = 'submit';

	protected updated(): void {
		const layout: ButtonLayout[number] = this.layout;
		const connotation: ButtonConnotation[number] | undefined =
			this.layout === 'filled' ? this.connotation ?? 'regular' : undefined;
		const shape: ButtonShape[number] = this.shape ?? 'rounded';

		const innerButton = this.shadowRoot?.querySelector('.mdc-button');

		if (innerButton) {
			//	get existing classes aside from the DOM
			const classesSet = new Set(innerButton.classList);

			//	merge classes
			this.toggleAttribute('outlined', layout === 'outlined');
			this.toggleAttribute('unelevated', layout === 'filled');
			if (layout === 'filled') {
				connotations.forEach((m) =>
					classesSet[connotation === m ? 'add' : 'delete'](m)
				);
			}
			shapes.forEach((s) => classesSet[shape === s ? 'add' : 'delete'](s));

			//	set the clases back to the DOM
			innerButton.className = Array.from(classesSet).join(' ');
		}
	}

	protected _handleClick() {
		const form = this.closest('form');
		if (form) {
			switch (this.getAttribute('type')) {
				case 'reset':
					form.reset();
					break;
				default:
					form.requestSubmit();
					break;
			}
		}
	}

	async firstUpdated() {
		// Give the browser a chance to paint - performance enhancement
		await new Promise((r) => setTimeout(r, 0));
		this.addEventListener('click', this._handleClick);
	}
}
