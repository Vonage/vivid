import { html, LitElement, property, TemplateResult } from 'lit-element';
import { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';

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

export class BadgeBase extends LitElement {
	@property({ type: String, reflect: true })
	connotation: BadgeConnotation = Connotation.Primary;

	@property({ type: String, reflect: true })
	shape?: Shape;

	@property({ type: String, reflect: true })
	layout: BadgeLayout = Layout.Filled;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = false;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.removeAttribute('dense');
				this.dense = false;
			}
		}
	}

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
