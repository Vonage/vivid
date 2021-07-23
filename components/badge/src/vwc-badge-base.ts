import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
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
 * @slot - This is a default/unnamed slot to assign text content. *deprecated* please use {@link text} instead
 */
export class VWCBadgeBase extends LitElement {
	@property({ type: String, reflect: true })
	connotation?: BadgeConnotation;

	@property({ type: String, reflect: true })
	shape?: BadgeShape;

	@property({ type: String, reflect: true })
	layout: BadgeLayout = Layout.Filled;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	@property({ type: String, reflect: true })
	text?: string;

	@property({ type: String, reflect: true })
	icon?: string;

	protected renderIcon(): TemplateResult {
		return html`&nbsp;<vwc-icon	inline type="${ifDefined(this.icon)}"></vwc-icon>`;
	}

	protected updated(changes: Map<string, boolean>): void {
		handleMultipleDenseProps(this, changes);
	}

	protected render(): TemplateResult {
		return html`<slot>
			${this.text || nothing}
		</slot>
		${this.icon ? this.renderIcon() : nothing}`;
	}
}
