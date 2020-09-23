import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css';
import { style as mwcButtonStyle } from '@material/mwc-button/mwc-button-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { Connotation } from '@vonage/vvd-foundation/constants';
import { html, TemplateResult } from 'lit-element';
import '@vonage/vwc-icon';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

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

export { Connotation };

const shapes = ['rounded', 'pill'];
export type ButtonShape = typeof shapes;

const types = ['submit', 'reset', 'button'];
export type ButtonType = typeof types;

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 * Our button supports native features like the 'form' and 'type' attributes
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ type: String, reflect: true })
	layout: ButtonLayout[number] = 'text';

	@property({ type: String, reflect: true })
	connotation?: Connotation | undefined;

	@property({ type: String, reflect: true })
	shape: ButtonShape[number] = 'rounded';

	@property({ type: String, reflect: true })
	type: ButtonType[number] = 'submit';

	@property({ type: String, reflect: true })
	form: string | undefined;

	protected updated(): void {
		const layout: ButtonLayout[number] = this.layout;
		this.toggleAttribute('outlined', layout === 'outlined');
		this.toggleAttribute('unelevated', layout === 'filled');
	}

	protected _handleClick(): void {
		let form: HTMLFormElement;
		const formId = this.getAttribute('form');
		if (formId) {
			form = document.getElementById(formId) as HTMLFormElement;
		} else {
			form = this.closest('form') as HTMLFormElement;
		}

		if (form) {
			switch (this.getAttribute('type')) {
				case 'reset':
					form.reset();
					break;
				case 'button':
					break;
				default:
					requestSubmit(form);
					break;
			}
		}
	}

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon size="small" type="${this.icon}"></vwc-icon>`;
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('click', this._handleClick);
	}
}
