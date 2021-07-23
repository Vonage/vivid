import { customElement } from 'lit-element';
import { VWCFigureBase } from './vwc-figure-base.js';
import { style } from './vwc-figure.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-figure': VWCFigure;
	}
}

@customElement('vwc-figure')
export class VWCFigure extends VWCFigureBase {
	/**
	 * @internal
	 */
	static styles = style;
}
