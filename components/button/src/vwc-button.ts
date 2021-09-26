import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css';
import { styles as mwcButtonStyles } from '@material/mwc-button/styles.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { Connotation, Layout, Shape } from '@vonage/vvd-foundation/constants';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button': VWCButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCButton.styles = [styleCoupling, mwcButtonStyles, vwcButtonStyle];

export type ButtonLayout = Extract<
	Layout,
	Layout.Filled | Layout.Outlined | Layout.Ghost
	>;

const types = ['submit', 'reset', 'button'];
export type ButtonType = typeof types;

type ButtonConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Info
	| Connotation.Announcement
>;

type ButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 * Our button supports native features like the 'form' and 'type' attributes
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ type: String, reflect: true })
	layout?: ButtonLayout;

	@property({ type: String, reflect: true })
	connotation?: ButtonConnotation;

	@property({ type: String, reflect: true })
	shape?: ButtonShape;

	@property({ type: String, reflect: true })
	type: ButtonType[number] = 'submit';

	@property({ attribute: 'form', reflect: true })
	formId: string | null = null;

	#_hiddenButton: HTMLButtonElement = VWCButton.createHiddenButton();

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

		this.toggleAttribute('outlined', this.layout === 'outlined');
		this.toggleAttribute('unelevated', this.layout === 'filled');

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
		return html`<vwc-icon	type="${this.icon}"></vwc-icon>`;
	}

	protected getRenderClasses() {
		return classMap({
			'mdc-button--raised': this.raised,
			'mdc-button--unelevated': this.unelevated,
			'mdc-button--outlined': this.outlined,
			'mdc-button--dense': this.dense,
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout
		});
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
