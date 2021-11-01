import {
	LitElement,
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { Size } from '@vonage/vvd-foundation/constants.js';
import { style } from './vwc-layout.css.js';


// eslint-disable-next-line no-shadow
export enum AutoSizing {
	Fit = 'fit',
	Fill = 'fill',
}

type Gutters = Extract<Size, Size.x_Small | Size.Medium | Size.x_Large>;
type ColumnSpacing = Extract<Size, Size.x_Small | Size.Medium | Size.x_Large>;
type ColumnBasis = Extract<Size, Size.Small | Size.Medium | Size.Large> | 'block';

/**
 * @cssprop [layout-grid-template-columns=repeat([the `auto-sizing` mapped value],	minmax([the `column-basis` mapped value], 1fr))] - Controls the `grid-template-columns` of the layout
 * */
@customElement('vwc-layout')
export class Layout extends LitElement {
	static override styles = style;

	/**
	 * @prop Gutters - sets the initial preferred margin from predefined available options
	 * @public
	 * */
	@property({ type: String, reflect: true, attribute: 'gutters' })
		gutters?: Gutters;

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
			[`layout-gutters-${this.gutters}`]: !!this.gutters,
			[`layout-column-spacing-${this.columnSpacing}`]: !!this.columnSpacing,
			[`layout-auto-sizing-${this.autoSizing}`]: !!this.autoSizing,
		};
	}

	protected override render(): TemplateResult {
		return html`<div class="layout ${classMap(this.getRenderClasses())}">
			<slot></slot>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-layout': Layout;
	}
}
