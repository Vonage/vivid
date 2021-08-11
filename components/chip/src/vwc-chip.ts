import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, LitElement, html, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { defaultTo } from 'ramda';
import { style } from './vwc-chip.css';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';

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

const defaultToNothing = defaultTo(nothing);

@customElement('vwc-chip')
export class VWCChip extends LitElement {
	static styles = style;
	@property({ type: String, reflect: true })
	text?: string;

	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: Boolean, reflect: true })
	selected?: boolean;

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
	trailingIcon?: string;

	render():TemplateResult {
		return html`<div>
			${defaultToNothing(this.icon && html`<vwc-icon class='icon' type='${this.icon}'></vwc-icon>`)}
			<span>${this.text}</span>
			${defaultToNothing(this.trailingIcon && html`<vwc-icon class='icon' type='${this.trailingIcon}'></vwc-icon>`)}
		</div>`;
	}
}
