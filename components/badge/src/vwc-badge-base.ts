import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import type { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants.js';
import { handleMultipleDenseProps } from '@vonage/vvd-foundation/general-utils.js';

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
			html`<div class="icon ${classMap(classes)}">
					<vwc-icon .type="${type}"></vwc-icon>
				</div>`
			: nothing;
	}

	protected override updated(changes: Map<string, boolean>): void {
		handleMultipleDenseProps(this, changes);
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout
		};
	}

	protected override render(): TemplateResult {
		return html`
			<span class="vwc-badge ${classMap(this.getRenderClasses())}">
				${this.renderIcon(this.icon)}
				<slot class="text">
					${this.text || nothing}
				</slot>
				${this.renderIcon(this.iconTrailing, true)}
			</span>`;
	}
}
