import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import type { Shape, Layout } from '@vonage/vvd-foundation/constants.js';

type ActionGroupLayout = Extract<
	Layout,
	Layout.Outlined | Layout.Ghost
>;

type ActionGroupShape = Extract<Shape, Shape.Rounded | Shape.Pill>;


/**
 * @slot - This is a default/unnamed slot to assign text content. *deprecated* please use _text_ property instead
 */
export class VWCActionGroupBase extends LitElement {
	@property({ type: String, reflect: true })
		shape?: ActionGroupShape;

	@property({ type: String, reflect: true })
		layout?: ActionGroupLayout;

	@property({ type: Boolean, reflect: true })
		tight = false;

	protected getRenderClasses(): ClassInfo {
		return {
			[`shape-${this.shape}`]: !!this.shape,
			[`layout-${this.layout}`]: !!this.layout,
			['tight']: !!this.tight,
		};
	}

	protected override render(): TemplateResult {
		return html`
			<div class="vwc-action-group ${classMap(this.getRenderClasses())}">
				<slot>
				</slot>
			</div>`;
	}
}
