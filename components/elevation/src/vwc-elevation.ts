import '@vonage/vvd-core';
import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css.js';
import { property } from 'lit-element/lib/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';

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
	static override styles = style;

	@property({ type: Number, reflect: false })
		dp = 2;

	protected override render(): unknown {
		const classList = {
			[`vwc-elevation-dp-${this.dp}`]: true,
		};

		return html`
			<div class="vwc-elevation ${classMap(classList)}" part="base">
				<slot></slot>
			</div>
		`;
	}
}
