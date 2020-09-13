import { html, LitElement, property, TemplateResult } from 'lit-element';
import { Connotation } from '@vonage/vvd-foundation/constants';

export class BadgeBase extends LitElement {
	@property({ type: Boolean, reflect: true }) translucent = false;
	@property({ type: String, reflect: true })
	connotation?: Connotation;

	protected render(): TemplateResult {
		return html` <slot></slot>`;
	}
}
