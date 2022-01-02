import '@vonage/vvd-core';
import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css.js';
import { property } from 'lit-element/lib/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';
import type { Shape } from '@vonage/vvd-foundation/constants.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation': VWCElevation;
	}
}

type ElevationShape = Extract<Shape, Shape.Rounded>;

@customElement('vwc-elevation')
export class VWCElevation extends LitElement {
	/**
	 * @internal
	 */
	static override styles = style;

	@property({ type: Number, reflect: false })
		dp = 2;

	@property( {type: String, reflect: true })
		shape?: ElevationShape[number] = 'Rounded';

	protected override render(): unknown {
		const classList = {
			[`vwc-elevation-dp-${this.dp}`]: true,
			[`vwc-elevation-${this.shape}`]: !!this.shape,
		};

		return html`
			<div class="vwc-elevation ${classMap(classList)}">
				<slot></slot>
			</div>
		`;
	}
}
