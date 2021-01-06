import { html, LitElement, property, TemplateResult } from 'lit-element';
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

export class BadgeBase extends LitElement {
	@property({ type: String, reflect: true })
	connotation: BadgeConnotation = Connotation.Primary;

	@property({ type: String, reflect: true })
	shape?: BadgeShape;

	@property({ type: String, reflect: true })
	layout: BadgeLayout = Layout.Filled;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	protected updated(changes: Map<string, boolean>): void {
		handleMultipleDenseProps(this, changes);
	}

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
