import {
	LitElement,
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { Size } from '@vonage/vvd-foundation/constants';
import { style } from './vwc-inline.css.js';

// eslint-disable-next-line no-shadow
export enum BlockSize { Block = 'block'}

// eslint-disable-next-line no-shadow
export enum InlineTemplate {
	Fit = 'fit',
	Fill = 'fill',
}

type ColumnSpacing = Extract<Size, Size.Small | Size.Medium>;
type InlineSize = Extract<Size | BlockSize, Size.Small | Size.Medium | Size.Large | BlockSize.Block>;

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	@property({ type: String, reflect: true })
	inlineSize: InlineSize = Size.Small;

	@property({ type: String, reflect: true })
	columnSpacing: ColumnSpacing = Size.Medium;

	@property({ type: String, reflect: true })
	template?: InlineTemplate;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-inline': Inline;
	}
}
