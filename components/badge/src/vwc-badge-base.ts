import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

import { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';
import { handleMultipleDenseProps } from '@vonage/vvd-foundation/general-utils';

type BadgeConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Info
>;

type BadgeLayout = Extract<
	Layout,
	Layout.Filled | Layout.Outlined | Layout.Soft
>;

type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * @slot - This is a default/unnamed slot to assign text content. *deprecated* please use _text_ property instead
 */
export class VWCBadgeBase extends LitElement {
	@property({ type: String, reflect: true })
	connotation?: BadgeConnotation;

	@property({ type: String, reflect: true })
	shape?: BadgeShape;

	@property({ type: String, reflect: true })
	layout?: BadgeLayout;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ type: String, reflect: true })
	text?: string;

	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: String, reflect: true })
	iconTrailing?: string;

	protected renderIcon(type?: string, isTrailingIcon = false): TemplateResult | typeof nothing {
		const classes = {
			'icon--leading': !isTrailingIcon,
			'icon--trailing': isTrailingIcon
		};

		return type ?
			html`<vwc-icon class="icon ${classMap(classes)}" .type="${type}"></vwc-icon>`
			: nothing;
	}

	protected updated(changes: Map<string, boolean>): void {
  	handleMultipleDenseProps(this, changes);
	}

	get #renderLayoutClass(): string {
		return ifDefined(this.layout) && `vvd-badge--layout-${this.layout}`;
	}

	protected render(): TemplateResult {
		return html`
			<span class="vwc-badge ${this.#renderLayoutClass}">
				${this.renderIcon(this.icon)}
				<slot>
					${this.text || nothing}
				</slot>
				${this.renderIcon(this.iconTrailing, true)}
			</span>`;
	}
}
