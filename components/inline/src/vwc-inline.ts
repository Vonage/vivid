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

// eslint-disable-next-line no-shadow
export enum InlineTemplate {
	Fit = 'fit',
	Fill = 'fill',
}

// eslint-disable-next-line no-shadow
export enum GridTemplate {
	Columns = 'columns',
	Rows = 'rows',
}

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	@property({ type: String, reflect: true })
	size: Size = Size.Small;

	@property({ type: String, reflect: true })
	spacing: SizeSpacing = Size.Small;

	@property({ type: String, reflect: true })
	inline?: InlineTemplate;

	@property({ type: String, reflect: true })
	gridTemplate?: GridTemplate;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-inline': Inline;
	}
}
