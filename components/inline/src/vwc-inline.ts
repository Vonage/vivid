import {
	LitElement,
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { Size } from '@vonage/vvd-foundation/constants';

import { style } from './vwc-inline.css.js';

type SizeSpacing = Extract<Size, Size.Small | Size.Medium>;

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	@property({ type: String, reflect: true })
	size: Size = Size.Small;

	@property({ type: String, reflect: true })
	spacing: SizeSpacing = Size.Small;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-inline': Inline;
	}
}
