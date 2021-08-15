import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, LitElement, html, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { style } from './vwc-chip.css';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';
import { classMap } from 'lit-html/directives/class-map';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

type ChipConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	>;

type ChipShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

@customElement('vwc-chip')
export class VWCChip extends LitElement {
	static styles = style;
	@property({ type: String, reflect: true })
	text?: string;

	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	dense?: boolean;

	@property({ type: Boolean, reflect: true })
	enlarged?: boolean;

	@property({ type: String, reflect: true })
	connotation?: ChipConnotation;

	@property({ type: String, reflect: true })
	shape?: ChipShape;

	@property({ type: String, reflect: true })
	layout?: string;

	@property({ type: String, reflect: true })
	iconTrailing?: string;

	protected renderIcon(type?: string, isTrailingIcon = false): TemplateResult | typeof nothing {
		const classes = {
			'icon--leading': !isTrailingIcon,
			'icon--trailing': isTrailingIcon
		};

		return type ?
			html`<vwc-icon class="icon ${classMap(classes)}" .type="${type}"></vwc-icon>`
			: nothing;
	}

	render(): TemplateResult {
		const classes = {
			'chip--selected': this.selected
		};

		return html`<span class="vwc-chip ${classMap(classes)}">
			${this.renderIcon(this.icon)}
			${this.text}
			${this.renderIcon(this.iconTrailing, true)}
		</span>`;
	}
}
