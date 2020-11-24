import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css';
import { style as mwcButtonStyle } from '@material/mwc-button/styles-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';
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
	connotation: Connotation = Connotation.Primary;

	@property({ type: String, reflect: true })
	shape?: Shape;

	@property({ type: String, reflect: true })
	type: ButtonType[number] = 'submit';

	@property({ attribute: 'form', reflect: true })
	formId = null;

	#_hiddenButton: HTMLButtonElement = VWCButton.createHiddenButton();

	createRenderRoot(): ShadowRoot {
		if (HTMLFormElement.prototype.requestSubmit) {
			return super.createRenderRoot();
		}
		// don't set delegatesFocus: true due to https://bugs.webkit.org/show_bug.cgi?id=215732
		return this.attachShadow({ mode: 'open' });
	}

	protected updateFormAndButton(): void {
		const formId = this.getAttribute('form');
		if (formId !== null) {
			this.#_hiddenButton?.setAttribute('form', formId);
		}
	}

	attributeChangedCallback(
		name: string,
		oldval: string | null,
		newval: string | null
	): void {
		if (name === 'form' && newval && newval !== oldval) {
			this.#_hiddenButton?.setAttribute('form', newval);
		} else {
			super.attributeChangedCallback(name, oldval, newval);
		}
	}

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('type')) {
			this.#_hiddenButton?.setAttribute('type', this.getAttribute('type') ?? '');
		}

		const layout: ButtonLayout[number] = this.layout;
		this.toggleAttribute('outlined', layout === 'outlined');
		this.toggleAttribute('unelevated', layout === 'filled');

		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = false;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.removeAttribute('dense');
				this.dense = false;
			}
		}
	}

	get form(): HTMLFormElement | null {
		return (this.#_hiddenButton as HTMLButtonElement).form;
	}

	set form(_: HTMLFormElement | null) {
		// return nothing
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
		return html`<vwc-icon
			class="vvd-icon"
			size="small"
			type="${this.icon}"
		></vwc-icon>`;
	}

	static createHiddenButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.style.display = 'none';
		return button;
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('click', this._handleClick);
		this.appendChild(this.#_hiddenButton);
	}
}
