import {
	LitElement, html, TemplateResult, property
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class VWCEmptyStateBase extends LitElement {
	@property({ type: String, reflect: true })
		icon?: string;

	@property({ type: String, reflect: true })
		heading?: string;

	@property({ type: String, reflect: true })
		body?: string;

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon class="illustration"	type="${ifDefined(this.icon)}"></vwc-icon>`;
	}

	protected renderHeading(): TemplateResult {
		return html`<h3 class="heading">${this.heading}</h3>`;
	}

	protected renderBody(): TemplateResult {
		return html`<p class="body">${this.body}</p>`;
	}

	protected override render(): TemplateResult {
		return html`<section>
			<slot name="graphic">
				${this.icon ? this.renderIcon() : nothing}
			</slot>
			${this.heading ? this.renderHeading() : nothing}
			${this.body ? this.renderBody() : nothing}
		</section>`;
	}
}
