import { html, LitElement, TemplateResult } from 'lit-element';

export class BadgeCombinedBase extends LitElement {
	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
