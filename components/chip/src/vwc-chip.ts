import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, LitElement, html, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { defaultTo } from 'ramda';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

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
	connotation?: boolean;

	@property({ type: String, reflect: true })
	shape?: string;

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
