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
export enum InlineTemplate {
	Fit = 'fit',
	Fill = 'fill',
}

type ColumnSpacing = Extract<Size, Size.Small | Size.Medium>;
type ColumnBasis = Extract<Size, Size.Small | Size.Medium | Size.Large> | 'block';

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	@property({ type: String, reflect: true, attribute: 'column-basis' })
	columnBasis: ColumnBasis = Size.Small;

	@property({ type: String, reflect: true, attribute: 'column-spacing' })
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
