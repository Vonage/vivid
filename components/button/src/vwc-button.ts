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
import { getFormByIdOrClosest } from '@vonage/vvd-foundation/form-association/common';

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
	@property({ type: String, reflect: true })
	layout: ButtonLayout[number] = 'text';

	@property({ type: String, reflect: true })
	connotation?: Connotation | undefined;

	@property({ type: String, reflect: true })
	shape: ButtonShape[number] = 'rounded';

	@property({ type: String, reflect: true })
	type: ButtonType[number] = 'submit';

	@property({ type: String, reflect: false })
	form: HTMLFormElement | null = null;

	#_hiddenButton: HTMLButtonElement | undefined;

	protected updateFormAndButton() {
		this.#_hiddenButton?.remove();
		this.form = getFormByIdOrClosest((this as unknown) as HTMLInputElement);
		if (this.form && this.#_hiddenButton) {
			this.form.appendChild(this.#_hiddenButton);
		}
	}

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('form')) {
			this.updateFormAndButton();
		}

		if (changes.has('type')) {
			this.#_hiddenButton?.setAttribute('type', this.getAttribute('type') ?? '');
		}

		const layout: ButtonLayout[number] = this.layout;
		this.toggleAttribute('outlined', layout === 'outlined');
		this.toggleAttribute('unelevated', layout === 'filled');
	}

	protected _handleClick(): void {
		if (this.form) {
			switch (this.getAttribute('type')) {
				case 'reset':
					this.form.reset();
					break;
				case 'button':
					break;
				default:
					requestSubmit(this.form);
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
		this.#_hiddenButton = document.createElement('button');
		this.#_hiddenButton.style.display = 'none';
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#_hiddenButton?.remove();
	}
}
