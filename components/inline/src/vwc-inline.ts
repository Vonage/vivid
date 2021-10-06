import {
	LitElement,
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import type { ClassInfo } from 'lit-html/directives/class-map';
import { Size } from '@vonage/vvd-foundation/constants';
import { style } from './vwc-inline.css.js';


// eslint-disable-next-line no-shadow
export enum AutoSizing {
	Fit = 'fit',
	Fill = 'fill',
}

type InlineGutters = Extract<Size, Size.x_Small | Size.Medium | Size.x_Large>;
type ColumnSpacing = Extract<Size, Size.x_Small | Size.Medium | Size.x_Large>;
type ColumnBasis = Extract<Size, Size.Small | Size.Medium | Size.Large> | 'block';

@customElement('vwc-inline')
export class Inline extends LitElement {
	static styles = style;

	/**
	 * @prop inlineGutters - sets the initial preferred margin from predefined available options
	 * @public
	 * */
	@property({ type: String, reflect: true, attribute: 'gutters' })
	inlineGutters?: InlineGutters;

	/**
	 * @prop columnBasis - sets the initial preferred measure of a column from predefined available options
	 * @public
	 * */
	@property({ type: String, reflect: true, attribute: 'column-basis' })
	columnBasis: ColumnBasis = Size.Small;

	/**
	 * @prop columnSpacing - sets the initial preferred spacing of a column from predefined available options
	 * @public
	 * */
	@property({ type: String, reflect: true, attribute: 'column-spacing' })
	columnSpacing: ColumnSpacing = Size.Medium;

	/**
	 * @prop auto-sizing - sets the initial preferred auto-sizing from predefined available options
	 * @public
	 * */
	@property({ type: String, reflect: true, attribute: 'auto-sizing' })
	autoSizing?: AutoSizing;

	protected getRenderClasses(): ClassInfo {
		return {
			[`layout-column-basis-${this.columnBasis}`]: !!this.columnBasis,
			[`layout-gutters-${this.inlineGutters}`]: !!this.inlineGutters,
			[`layout-column-spacing-${this.columnSpacing}`]: !!this.columnSpacing,
			[`layout-auto-sizing-${this.autoSizing}`]: !!this.autoSizing,
		};
	}

	protected render(): TemplateResult {
		return html`<div class="layout ${classMap(this.getRenderClasses())}">
			<slot></slot>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-inline': Inline;
	}
}
