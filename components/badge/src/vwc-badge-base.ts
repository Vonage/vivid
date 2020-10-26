import { html, LitElement, property, TemplateResult } from 'lit-element';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';

export class BadgeBase extends LitElement {
	@property({ type: Boolean, reflect: true }) translucent = false;

	@property({ type: String, reflect: true })
	connotation?: Connotation;

	@property({ type: String, reflect: true })
	shape?: Shape | undefined;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
