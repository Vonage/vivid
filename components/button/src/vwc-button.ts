import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { html, TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators';
import type { ClassInfo } from 'lit/directives/class-map.js';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css.js';
import { styles as mwcButtonStyles } from '@material/mwc-button/styles.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import type { Connotation, Layout, Shape } from '@vonage/vvd-foundation/constants.js';
import type { PropertyValues } from 'lit';

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
	@property({ type: String, reflect: true })
		name?: string;

	@property({ type: String, reflect: true })
		value?: string;

	@property({ type: Boolean, reflect: true })
	override dense = false;

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

	override attributeChangedCallback(
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

	protected override update(changes: PropertyValues): void {
		super.update(changes);
		[...changes.keys()]
			.filter(attributeName => ['name', 'value'].includes(attributeName as string))
			.forEach((attributeName) => {
				this.#_hiddenButton.setAttribute(attributeName as string, (this as any)[attributeName as string]);
			});
	}

	protected override updated(changes: Map<string, boolean>): void {
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

	protected _handleClick(event: MouseEvent): void {
		if (this.form) {
			switch (this.getAttribute('type')) {
			case 'reset':
				this.form.reset();
				break;
			case 'button':
				break;
			default:
				if (event.target === this) {
					this.#_hiddenButton.click();
				} else {
					event.stopImmediatePropagation();
				}
				break;
			}
		}
	}

	protected override renderIcon(): TemplateResult {
		return html`<vwc-icon	type="${this.icon}"></vwc-icon>`;
	}

	protected override getRenderClasses(): ClassInfo {
		return {
			...super.getRenderClasses(),
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout
		};
	}

	static createHiddenButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.style.display = 'none';
		return button;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('click', this._handleClick);
		this.appendChild(this.#_hiddenButton);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
	}
}

