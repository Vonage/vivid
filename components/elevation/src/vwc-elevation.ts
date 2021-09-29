import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css.js';
import { property } from 'lit-element/lib/decorators';
import { classMap } from 'lit-html/directives/class-map';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation': VWCElevation;
	}
}

@customElement('vwc-elevation')
export class VWCElevation extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({ type: Number, reflect: false })
	dp = 2;

	protected render(): unknown {
		const classList = {
			[`vwc-elevation-dp-${this.dp}`]: true
		};

		return html`
			<div class="vwc-elevation ${classMap(classList)}">
				<slot></slot>
			</div>
		`;
	}
}
